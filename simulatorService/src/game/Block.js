function Block(type, length) {
    this.length = length;
    this.type = type;
    this.damage = 0;
    this.isConquered = false;
    this.isUsed = false;
    this.location = {
        x: null,
        y: null,
        direction: null
    };
    this.cells = [];
    this.initialize();
}

Block.prototype.initialize = function () {
    this.damage = 0;
    this.isConquered = false;
    this.isUsed = false;
    this.location = {
        x: null,
        y: null,
        direction: null
    };
    this.cells = [];
};

Block.prototype.hit = function () {
    if (this.damage === this.length) {
        return false;
    } else if (++this.damage === this.length) {
        this.isConquered = true;
    }
    return true;
};

Block.HORIZONTAL = 0;
Block.VERTICAL 	= 1;

module.exports = Block;
