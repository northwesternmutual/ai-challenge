const Cell = require('./Cell.js');
const Block = require('./Block.js');
const Collection = require('./Collection.js');

function Grid() {
	this.collection = new Collection();
	this.initialize();
}

Grid.prototype.initialize = function() {
	this.collection.initialize();
	this.create();
};

Grid.prototype.create = function() {
	this.cells = [];
	for(var i=0; i<10; ++i) {
		this.cells[i] = [];
		for(var j=0; j<10; ++j) {
			this.cells[i].push(new Cell());
		}
	}
};

Grid.prototype.getCell = function(x, y) {
	var invalid = x > 9 || x < 0 || y > 9 || y < 0;
	return invalid ? null : this.cells[x][y];	
};

Grid.prototype.placeBlock = function(x, y, direction, blockType) {
	var block = this.collection.getBlockByType(blockType);

    //check to see if the block exists
    if(block == null) {
        return false;
    }

    //see is it is valid to place the block there
    if(this.inBounds(x, y, direction, block) && !this.doesCollide(x, y, direction, block) && !block.isUsed) {

        //dock the block
        block.isUsed = true;
        block.location.x = x;
        block.location.y = y;
        block.location.direction = direction;

        var bound;

        switch(direction) {
            case Block.HORIZONTAL:
                bound = x;
                break;
            case Block.VERTICAL:
                bound = y;
                break;
            default:
                return false;
        }

        for( var i = bound; i < bound + block.length; ++i ) {
            var cell = this.getCell(direction === Block.HORIZONTAL ? i : x, direction === Block.HORIZONTAL ? y : i);  
            cell.setBlock(block);
            cell.state = Cell.TYPE_BLOCK;
            block.cells.push(cell);
        }   

    } else {
        return false;
    }
    return true;
};

Grid.prototype.doesCollide = function (x, y, direction, block) {
	var bound = direction === Block.HORIZONTAL ? x : y;

    for( var i = bound; i < bound + block.length; ++i ) {
        var cell = this.getCell(direction === Block.HORIZONTAL ? i : x, direction === Block.HORIZONTAL ? y : i);
        //even though there are other cell states, since we only place ships
        //when the board is empty, if the cell is not empty, it must have another block
        if(cell.state !== Cell.TYPE_EMPTY) {
            return true;
        }
    }
    return false;
};

Grid.prototype.getBlockByCoord = function(x, y) {
	return this.getCell(x, y) === null ? null : this.getCell(x, y).block;
};

Grid.prototype.inBounds = function(x, y, direction, block) {
	//are the corrdinates in bounds?
    if(x < 0 || x > 9 || y < 0 || y > 9) {
        return false;
    }

    return direction === Block.VERTICAL ? (y + (block.length - 1) <= 9) : (x + (block.length - 1) <= 9);
};

module.exports = Grid;
