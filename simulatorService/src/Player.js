const Grid = require('./Grid.js');

function Player(type) {
	this.type = type;
	this.grid = new Grid();
	this.hitsTaken = 0;
	this.hitsDealt = 0;
	this.accuracy = function() {
		return this.hitsDealt / this.hitsTaken;
	};
}

Player.prototype.initialize = function() {
	this.grid.initialize();
	this.hitsTaken = 0;
	this.hitsDealt = 0;
};

Player.prototype.shoot = function(x, y) {
	return require('./Game.js').shoot(this, x, y);
	//return Game.shoot(this, x, y);
};

Player.PLAYERONE = 1;
Player.PLAYERTWO = 2;

module.exports = Player;