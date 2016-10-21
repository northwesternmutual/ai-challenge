function Cell() {
	this.temperature = 0;
	this.state = Cell.TYPE_EMPTY;
	this.ship = null;
}

Cell.prototype.setShip = function(ship) {
	this.ship = ship;
};

Cell.TYPE_EMPTY = 0; // 0 = water (empty)
Cell.TYPE_SHIP 	= 1; // 1 = undamaged ship
Cell.TYPE_MISS 	= 2; // 2 = water with a cannonball in it (missed shot)
Cell.TYPE_HIT 	= 3; // 3 = damaged ship (hit shot)
Cell.TYPE_SUNK 	= 4; // 4 = sunk ship

module.exports = Cell;