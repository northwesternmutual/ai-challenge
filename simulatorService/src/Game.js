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
	if( cell.state === Cell.TYPE_MISS || cell.state === Cell.TYPE_HIT || cell.state === Cell.TYPE_CONQUERED ) {
		return {
			state: null,
			block: null
		};
	}

	//hit the cell
	++player.shotsTaken;

	//increase the temperature of that cell by 1
	++cell.temperature;

	if( cell.state === Cell.TYPE_BLOCK ) {
		++player.hitsDealt;
		cell.state = Cell.TYPE_HIT;
		cell.block.hit();
		if( cell.block.isConquered ) {
			cell.block.cells.filter( function(cell) {
				cell.state = Cell.TYPE_CONQUERED;
			});
		}
	} else { //cell.state === TYPE_EMPTY
		cell.state = Cell.TYPE_MISS;
	}

	return {
		state: cell.state,
		block: cell.block === null ? null : cell.block.type
	};
};

Game.prototype.isOver = function() {
	if(one.grid.collection.isConquered()) {
		return two;
	} else if(two.grid.collection.isConquered()) {
		return one;
	} else if(!one.grid.collection.isPlaced() && two.grid.collection.isPlaced()) {
		return two;
	} else if(one.grid.collection.isPlaced() && !two.grid.collection.isPlaced()) {
		return one;
	} else if (!one.grid.collection.isPlaced() && !two.grid.collection.isPlaced()) {
		return this.getRandomPlayer();
	} else if(one.grid.collection.hasMoved(this.playerOneState)) {
		return two;
	} else if(two.grid.collection.hasMoved(this.playerTwoState)) {
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
