function Block(type, length) {
	this.length = length;
	this.type = type;
	this.initialize();
}

Block.prototype.initialize = function() {
	this.damage = 0;
	this.isSunk = false;
	this.isUsed = false;
	this.location = {
		x: null,
		y: null,
		direction: null
	};
	this.cells = [];
};

Block.prototype.hit = function() {
	if(++this.damage === this.length) {
		this.isSunk = true;
	}
};

Block.HORIZONTAL = 0;
Block.VERTICAL 	= 1;

module.exports = Block;