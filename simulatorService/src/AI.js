const Block = require('./Block.js');
const Collection = require('./Collection.js');
const Grid = require('./Grid.js');
const Cell = require('./Cell.js');

function AI(algObj, player) {
	this.player = player;
	this.algObj = algObj;

	// Isolate the impact of eval within makeFunction
	function makeFunction(text) {
		return eval("(function() { " + text + "})");
	};

	this.initializeSimulation 	= makeFunction(this.algObj.initializeSimulation);
	this.initializeGame 		= makeFunction(this.algObj.initializeGame);
	this.startGame 				= makeFunction(this.algObj.startGame);
	this.shoot 					= makeFunction(this.algObj.shoot);
	this.endGame 				= makeFunction(this.algObj.endGame);
}

module.exports = AI;