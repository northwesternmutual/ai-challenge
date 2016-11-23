const Player = require('./Player.js');
const AI = require('./AI.js');
const Cell = require('./Cell.js');
const { PlayerOneError, PlayerTwoError, PlayerAllError } = require('../errors.js');

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

	//to be fair....
	//we'll first try player one's algorithm
	//if it fails, we'll see if player two's algorithm is valid
	//if it does, then both AI's are faulty.tbh it'
	try { this.AIOne.initializeGame(); }
	catch (e1) {
		try { this.AITwo.initializeGame(); }
		catch(e2) { throw new PlayerAllError(); }
		throw new PlayerOneError();
	}

	try { this.AITwo.initializeGame(); }
	catch (e) { throw new PlayerTwoError(); }
};

Game.prototype.playGame = function() {
	
	try { this.AIOne.startGame(); }
	catch (e1) {
		try { this.AITwo.startGame(); }
		catch(e2) { throw new PlayerAllError(); }
		throw new PlayerOneError();
	}

	try { this.AITwo.startGame(); }
	catch (e) { throw new PlayerTwoError(); }

	//get the current state of the fleet
	this.playerOneState = one.grid.collection.blocks;
	this.playerTwoState = two.grid.collection.blocks;

	//pick a random player to go first
	var firstPlayer 	= this.getRandomPlayer();
	var secondPlayer 	= firstPlayer.type === Player.PLAYERONE ? two : one;
	var firstAI 		= firstPlayer.type === Player.PLAYERONE ? this.AIOne : this.AITwo;
	var secondAI 		= firstPlayer.type === Player.PLAYERONE ? this.AITwo : this.AIOne;
	this.winner 		= this.isOver();

	while( this.winner === false ) {

		try { firstAI.shoot(); }
		catch (e1) {
			try { secondAI.shoot(); }
			catch(e2) { throw new PlayerAllError(); }
			throw firstAI.type === Player.PLAYERONE ? new PlayerOneError : new PlayerTwoError;
		}

		this.winner = this.isOver();
		if( this.winner !== false ) { break; }
		
		try { secondAI.shoot(); }
		catch (e) { throw firstAI.type === Player.PLAYERONE ? new PlayerOneError : new PlayerTwoError; }

		this.winner = this.isOver();
	}

	//Call each AI's endGame() function
	try { this.AIOne.endGame(); }
	catch (e1) {
		try { this.AITwo.endGame(); }
		catch(e2) { throw new PlayerAllError(); }
		throw new PlayerOneError();
	}

	try { this.AITwo.endGame(); }
	catch (e) { throw new PlayerTwoError(); }
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
