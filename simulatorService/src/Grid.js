const Cell = require('./Cell.js');
const Ship = require('./Ship.js');
const Fleet = require('./Fleet.js');

function Grid() {
	this.fleet = new Fleet();
	this.initialize();
}

Grid.prototype.initialize = function() {
	this.fleet.initialize();
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

Grid.prototype.dockShip = function(x, y, direction, shipType) {
	var ship = this.fleet.getShipByType(shipType);

    //see is it is valid to pace the ship there
    if(this.inBounds(x, y, direction, ship) && !this.doesCollide(x, y, direction, ship) && !ship.isUsed) {

        //dock the ship
        ship.isUsed = true;
        ship.location.x = x;
        ship.location.y = y;
        ship.location.direction = direction;

        var bound = direction === Ship.HORIZONTAL ? x : y;

        for( var i = bound; i < bound + ship.length; ++i ) {
            var cell = this.getCell(direction === Ship.HORIZONTAL ? i : x, direction === Ship.HORIZONTAL ? y : i);  
            cell.setShip(ship);
            cell.state = Cell.TYPE_SHIP;
            ship.cells.push(cell);
        }   

    } else {
        return false;
    }
    return true;
};

Grid.prototype.doesCollide = function (x, y, direction, ship) {
	var bound = direction === Ship.HORIZONTAL ? x : y;

    for( var i = bound; i < bound + ship.length; ++i ) {
        var cell = this.getCell(direction === Ship.HORIZONTAL ? i : x, direction === Ship.HORIZONTAL ? y : i);
        //even though there are other cell states, since we only place ships
        //when the board is empty, if the cell is not empty, it must have another ship
        if(cell.state !== Cell.TYPE_EMPTY) {
            return true;
        }
    }
    return false;
};

Grid.prototype.getShipByCoord = function(x, y) {
	return this.getCell(x, y) === null ? null : this.getCell(x, y).ship;
};

Grid.prototype.inBounds = function(x, y, direction, ship) {
	//are the corrdinates in bounds?
    if(x < 0 || x > 9 || y < 0 || y > 9) {
        return false;
    }

    return direction === Ship.VERTICAL ? (y + (ship.length - 1) <= 9) : (x + (ship.length - 1) <= 9);
};

module.exports = Grid;