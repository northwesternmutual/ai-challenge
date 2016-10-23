function Cell() {
	this.temperature = 0;
	this.state = Cell.TYPE_EMPTY;
	this.block = null;
}

Cell.prototype.setBlock = function(block) {
	this.block = block;
};

Cell.TYPE_EMPTY 	= 0; // 0 = water (empty)
Cell.TYPE_BLOCK 	= 1; // 1 = undamaged block
Cell.TYPE_MISS 		= 2; // 2 = water with a cannonball in it (missed shot)
Cell.TYPE_HIT 		= 3; // 3 = damaged block (hit shot)
Cell.TYPE_CONQUERED = 4; // 4 = sunk block

module.exports = Cell;