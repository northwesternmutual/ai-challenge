const Player = require('./Player.js');
const AI = require('./AI.js');
const Cell = require('./Cell.js');

var one, two;

function Game(playerOne, playerTwo, AIOne, AITwo) {
	this.winner = null;
	two = playerTwo;
	one = playerOne;
	this.AIOne = AIOne;
	this.AITwo = AITwo;
}

Game.prototype.initialize = function() {
	this.winner = null;
	one.initialize();
	two.initialize();
	this.AIOne.initializeGame();
	this.AITwo.initializeGame();
};

Game.prototype.playGame = function() {
	this.AIOne.startGame();
	this.AITwo.startGame();

	//get the current state of the fleet
	this.playerOneState = one.grid.fleet.ships;
	this.playerTwoState = two.grid.fleet.ships;

	//pick a random player to go first
	var firstPlayer 	= this.getRandomPlayer();
	var secondPlayer 	= firstPlayer.type === Player.PLAYERONE ? two : one;
	var firstAI 		= firstPlayer.type === Player.PLAYERONE ? this.AIOne : this.AITwo;
	var secondAI 		= firstPlayer.type === Player.PLAYERONE ? this.AITwo : this.AIOne;
	this.winner 		= this.isOver();

	while( this.winner === false ) {
		firstAI.shoot();
		this.winner = this.isOver();
		if( this.winner !== false ) { break; }
		secondAI.shoot();
		this.winner = this.isOver();
	}

	//Call each AI's endGame() function
	this.AIOne.endGame();
	this.AITwo.endGame();
};

Game.shoot = function(player, x, y) {
	//are the corrdinates in bounds?
	if(x < 0 || x > 9 || y < 0 || y > 9) {
		return false;
	}

	//get a pointer to the opponent
	var opponent = player.type === Player.PLAYERONE ? two : one;

	//get the location
	var cell = opponent.grid.getCell(x, y);

	//has this cell already been hit
	if( cell.state === Cell.TYPE_MISS || cell.state === Cell.TYPE_HIT || cell.state === Cell.TYPE_SUNK ) {
		return {
			state: null,
			ship: null
		};
	}

	//hit the cell
	++player.shotsTaken;

	//increase the temperature of that cell by 1
	++cell.temperature;

	if( cell.state === Cell.TYPE_SHIP ) {
		++player.hitsDealt;
		cell.state = Cell.TYPE_HIT;
		cell.ship.hit();
		if( cell.ship.isSunk ) {
			cell.ship.cells.filter( function(cell) {
				cell.state = Cell.TYPE_SUNK;
			});
		}
	} else { //cell.state === TYPE_EMPTY
		cell.state = Cell.TYPE_MISS;
	}

	return {
		state: cell.state,
		ship: cell.ship === null ? null : cell.ship.type
	};
};

Game.prototype.isOver = function() {
	if(one.grid.fleet.isSunk()) {
		return two;
	} else if(two.grid.fleet.isSunk()) {
		return one;
	} else if(!one.grid.fleet.isPlaced() && two.grid.fleet.isPlaced()) {
		return two;
	} else if(one.grid.fleet.isPlaced() && !two.grid.fleet.isPlaced()) {
		return one;
	} else if (!one.grid.fleet.isPlaced() && !two.grid.fleet.isPlaced()) {
		return this.getRandomPlayer();
	} else if(one.grid.fleet.hasMoved(this.playerOneState)) {
		return two;
	} else if(two.grid.fleet.hasMoved(this.playerTwoState)) {
		return one;
	} else {
		return false;
	}
};

Game.prototype.getRandomPlayer = function() {
	if( Math.floor( Math.random() * 10 ) % 2 === 0 ) {
		return one;
	} else {
		return two;
	}
};

module.exports = Game;
