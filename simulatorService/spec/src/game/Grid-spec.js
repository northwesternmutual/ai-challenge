import Block from '../../../src/game/Block';
import Cell from '../../../src/game/Cell';
import Collection from '../../../src/game/Collection';
import Grid from '../../../src/game/Grid';

let grid;

describe('Grid', () => {

    beforeEach(() => {
        grid = new Grid();
    });

    describe('constructor', () => {
        it('should create a new collection', () => {
            expect(grid.collection).toEqual(new Collection());
        });
    });

    describe('#initialize', () => {
        it('should initialize collection', () => {
            let collection = new Collection();
            collection.initialize();
            expect(grid.collection).toEqual(collection);
        });
    });

    describe('#create', () => {
        it('should create a grid of cells', () => {
            let cells = [];
            for (var i = 0; i < 10; ++i) {
                cells[i] = [];
                for (var j = 0; j < 10; ++j) {
                    cells[i].push(new Cell());
                }
            }
            expect(grid.cells).toEqual(cells);
        });
    });

    describe('#getCell', () => {
        it('should return the expected cell', () => {
            let cell = grid.cells[0][0];
            expect(cell).toEqual(grid.getCell(0, 0));
        });
    });

    describe('#placeBlock', () => {
        it('should place block in top left with vertial orientation', () => {
            expect(grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYTWO)).toBe(true);
        });
        it('should place block in top left with horizontal orientation', () => {
            expect(grid.placeBlock(0, 0, Block.HORIZONTAL, Collection.ONEBYTWO)).toBe(true);
        });
        it('should not place block in top left with vertial orientation', () => {
            expect(grid.placeBlock(0, -1, Block.VERTICAL, Collection.ONEBYTWO)).toBe(false);
        });
        it('should not place block in top left with horizontal orientation', () => {
            expect(grid.placeBlock(-1, 0, Block.HORIZONTAL, Collection.ONEBYTWO)).toBe(false);
        });
        it('should not place block for orientation that doesn\'t exist', () => {
            expect(grid.placeBlock(0, 0, Block.TESTING, Collection.ONEBYTWO)).toBe(false);
        });
        it('should not place block that doesn\'t exist', () => {
            expect(grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYSEVEN)).toBe(false);
        });
        it('should place block in bottom left with horizontal orientation', () => {
            expect(grid.placeBlock(0, 9, Block.HORIZONTAL, Collection.ONEBYSIX)).toBe(true);
        });
        it('should place block in bottom left with vertial orientation', () => {
            expect(grid.placeBlock(0, 4, Block.VERTICAL, Collection.ONEBYSIX)).toBe(true);
        });
        it('should not place block in bottom left with vertial orientation', () => {
            expect(grid.placeBlock(0, 5, Block.VERTICAL, Collection.ONEBYSIX)).toBe(false);
        });
        it('should place block in top right with horizontal orientation', () => {
            expect(grid.placeBlock(6, 0, Block.HORIZONTAL, Collection.ONEBYFOUR)).toBe(true);
        });
        it('should place block in top right with vertial orientation', () => {
            expect(grid.placeBlock(9, 0, Block.VERTICAL, Collection.ONEBYFOUR)).toBe(true);
        });
        it('should not place block in top right with vertial orientation', () => {
            expect(grid.placeBlock(10, 0, Block.VERTICAL, Collection.ONEBYSIX)).toBe(false);
        });
        it('should not place block in top right with horizontal orientation', () => {
            expect(grid.placeBlock(5, 0, Block.HORIZONTAL, Collection.ONEBYSIX)).toBe(false);
        });
        it('should not place block if already placed', () => {
            expect(grid.placeBlock(6, 0, Block.HORIZONTAL, Collection.ONEBYFOUR)).toBe(true);
            expect(grid.placeBlock(9, 0, Block.VERTICAL, Collection.ONEBYFOUR)).toBe(false);
        });
        it('should place block in bottom right with horizontal orientation', () => {
            expect(grid.placeBlock(7, 9, Block.HORIZONTAL, Collection.ONEBYTHREE)).toBe(true);
        });
        it('should place block in bottom right with vertial orientation', () => {
            expect(grid.placeBlock(9, 7, Block.VERTICAL, Collection.ONEBYTHREE)).toBe(true);
        });
        it('should not place block in bottom right with vertial orientation', () => {
            expect(grid.placeBlock(9, 8, Block.VERTICAL, Collection.ONEBYSIX)).toBe(false);
        });
        it('should not place block in bottom right with horizonal orientation', () => {
            expect(grid.placeBlock(9, 8, Block.VERTICAL, Collection.ONEBYSIX)).toBe(false);
        });
    });

    describe('#doesCollide', () => {
        it('should not place block if it collides with another one', () => {
            expect(grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYSIX)).toBe(true);
            expect(grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYFIVE)).toBe(false);
            expect(grid.placeBlock(0, 5, Block.VERTICAL, Collection.ONEBYFIVE)).toBe(false);
            expect(grid.placeBlock(0, 6, Block.VERTICAL, Collection.ONEBYTWO)).toBe(true);
        });
    });

    describe('#getBlockByCoord', () => {
        it('should return the block associated with the coordinate', () => {
            grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYTWO);
            expect(grid.getBlockByCoord(0, 0)).toBe(grid.collection.blocks.ONEBYTWO);
        });
        it('should return the block associated with the coordinate', () => {
            grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYTWO);
            expect(grid.getBlockByCoord(0, 1)).toBe(grid.collection.blocks.ONEBYTWO);
        });
        it('should return null if the block doesn\'t exist at that coordinate', () => {
            grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYTWO);
            expect(grid.getBlockByCoord(1, 0)).toBe(null);
        });
    });

    describe('#inBounds', () => {
        it('should test to see whether it\'s in bounds', () => {
            expect(grid.inBounds(0, 0, Block.VERTICAL, grid.collection.getBlockByType(Collection.ONEBYTWO))).toBe(true);
            expect(grid.inBounds(0, 9, Block.VERTICAL, Collection.ONEBYTWO)).toBe(false);
        });
    });

});
