const Block = require('./Block.js');
const Cell = require('./Cell.js');

function Collection() {
	this.blocks 			= {};
	this.blocks.ONEBYTWO 	= new Block(Collection.ONEBYTWO, 2);
	this.blocks.ONEBYTHREE 	= new Block(Collection.ONEBYTHREE, 3);
	this.blocks.ONEBYFOUR 	= new BlockBlock(Collection.ONEBYFOUR, 4);
	this.blocks.ONEBYFIVE 	= new BlockBlock(Collection.ONEBYFIVE, 5);
	this.blocks.ONEBYSIX 	= new BlockBlock(Collection.ONEBYSIX, 6);
}

Collection.prototype.initialize = function() {
	this.blocks.ONEBYTWO.initialize();
	this.blocks.ONEBYTHREE.initialize();
	this.blocks.ONEBYFOUR.initialize();
	this.blocks.ONEBYFIVE.initialize();
	this.blocks.ONEBYSIX.initialize();
};

Collection.prototype.isPlaced = function() {
	if( this.blocks.ONEBYTWO.isUsed && 
        this.blocks.ONEBYTHREE.isUsed &&
        this.blocks.ONEBYFOUR.isUsed &&
        this.blocks.ONEBYFIVE.isUsed &&
        this.blocks.ONEBYSIX.isUsed ) {

        return true;

    } else { return false; }
};

Collection.prototype.isSunk = function() {
	if( this.blocks.ONEBYTWO.isSunk && 
		this.blocks.ONEBYTHREE.isSunk &&
		this.blocks.ONEBYFOUR.isSunk &&
		this.blocks.ONEBYFIVE.isSunk &&
		this.blocks.ONEBYSIX.isSunk ) {

		return true;

	} else { return false; }
};

Collection.prototype.getShipByType = function(type) {
	switch(type) {
		case Collection.ONEBYTWO:
			return this.blocks.ONEBYTWO;
			break;
		case Collection.ONEBYTHREE:
			return this.blocks.ONEBYTHREE;
			break;
		case Collection.ONEBYFOUR:
			return this.blocks.ONEBYFOUR;
			break;
		case Collection.ONEBYFIVE:
			return this.blocks.ONEBYFIVE;
			break;
		case Collection.ONEBYSIX:
			return this.blocks.ONEBYSIX;
			break;
		default: 
			return null;
	}

};

Collection.prototype.hasMoved = function(state) {
	var stateChanged = false;

    for (var key in this.blocks) {
        if ({}.hasOwnProperty.call(this.blocks, key) && {}.hasOwnProperty.call(state, key) ) {
            var o = state[key].location;
            var n = this.blocks[key].location;

            if(o.x !== n.x && o.y !== n.y && o.direction !== n.direction) {
                stateChanged = true;
                break;
            }
        }
    }
    return stateChanged;
};

Collection.ONEBYTWO 	= 0;
Collection.ONEBYTHREE  	= 1;
Collection.ONEBYFOUR 	= 2;
Collection.ONEBYFIVE 	= 3;
Collection.ONEBYSIX 	= 4;

module.exports = Collection;