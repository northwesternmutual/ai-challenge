const Block = require('./Block.js');

function Collection() {
    this.blocks 						= {};
    this.blocks.ONEBYTWO 		= new Block(Collection.ONEBYTWO, 2);
    this.blocks.ONEBYTHREE 	= new Block(Collection.ONEBYTHREE, 3);
    this.blocks.ONEBYFOUR 	= new Block(Collection.ONEBYFOUR, 4);
    this.blocks.ONEBYFIVE 	= new Block(Collection.ONEBYFIVE, 5);
    this.blocks.ONEBYSIX 		= new Block(Collection.ONEBYSIX, 6);
}

Collection.prototype.initialize = function () {
    this.blocks.ONEBYTWO.initialize();
    this.blocks.ONEBYTHREE.initialize();
    this.blocks.ONEBYFOUR.initialize();
    this.blocks.ONEBYFIVE.initialize();
    this.blocks.ONEBYSIX.initialize();
};

Collection.prototype.isPlaced = function () {
    if (this.blocks.ONEBYTWO.isUsed &&
        this.blocks.ONEBYTHREE.isUsed &&
        this.blocks.ONEBYFOUR.isUsed &&
        this.blocks.ONEBYFIVE.isUsed &&
        this.blocks.ONEBYSIX.isUsed) {

        return true;

    } else { return false; }
};

Collection.prototype.isConquered = function () {
    if (this.blocks.ONEBYTWO.isConquered &&
        this.blocks.ONEBYTHREE.isConquered &&
        this.blocks.ONEBYFOUR.isConquered &&
        this.blocks.ONEBYFIVE.isConquered &&
        this.blocks.ONEBYSIX.isConquered) {

        return true;

    } else { return false; }
};

Collection.prototype.getBlockByType = function (type) {
    switch (type) {
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

Collection.prototype.hasMoved = function (state) {
    var stateChanged = false;

    for (var key in this.blocks) {
        if ({}.hasOwnProperty.call(this.blocks, key) && {}.hasOwnProperty.call(state, key)) {
            var o = state[key].location;
            var n = this.blocks[key].location;

            if (o.x !== n.x && o.y !== n.y && o.direction !== n.direction) {
                stateChanged = true;
                break;
            }
        } else if (!({}.hasOwnProperty.call(this.blocks, key)) || !({}.hasOwnProperty.call(state, key))) {
            stateChanged = true;
            break;
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
