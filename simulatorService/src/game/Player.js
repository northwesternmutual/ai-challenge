const Grid = require('./Grid.js');
const Cell = require('./Cell.js');

function Player(type) {
	this.type = type;
	this.grid = new Grid();
	this.shotsTaken = 0;
	this.hitsDealt = 0;
	this.accuracy = function() {
		return this.hitsDealt / this.shotsTaken;
	};
}

Player.prototype.initialize = function() {
	this.grid.initialize();
	this.shotsTaken = 0;
	this.hitsDealt = 0;
};

Player.prototype.shoot = function(x, y) {
	let shotResult = require('./Game.js').shoot(this, x, y);

	return shotResult;
};

Player.PLAYERONE = 1;
Player.PLAYERTWO = 2;

module.exports = Player;