const Block = require('./Block.js'); // eslint-disable-line no-unused-vars
const Collection = require('./Collection.js'); // eslint-disable-line no-unused-vars
const Grid = require('./Grid.js'); // eslint-disable-line no-unused-vars
const Cell = require('./Cell.js'); // eslint-disable-line no-unused-vars

function AI(algObj, player) {
    this.player = player;
    this.algObj = algObj;

    // Isolate the impact of eval within makeFunction
    function makeFunction(text) {
        return eval(`(function() {${text}})`);
    };

    this.initializeSimulation 	= makeFunction(this.algObj.initializeSimulation);
    this.initializeGame 		= makeFunction(this.algObj.initializeGame);
    this.startGame 				= makeFunction(this.algObj.startGame);
    this.shoot 					= makeFunction(this.algObj.shoot);
    this.endGame 				= makeFunction(this.algObj.endGame);
}

module.exports = AI;
