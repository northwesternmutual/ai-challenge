import Block from '../../src/game/Block';
import Cell from '../../src/game/Cell';
import Collection from '../../src/game/Collection';
import Grid from '../../src/game/Grid';

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
			for(var i=0; i<10; ++i) {
				cells[i] = [];
				for(var j=0; j<10; ++j) {
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
		it('should place block', () => {
			expect(grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYTWO)).toBe(true);
		});
		it('should not place block', () => {
			expect(grid.placeBlock(0, 0, Block.TESTING, Collection.ONEBYTWO)).toBe(false);
		});
		it('should not place block', () => {
			expect(grid.placeBlock(0, 0, Block.VERTICAL, Collection.ONEBYSEVEN)).toBe(false);
		});
		it('should place block', () => {
			expect(grid.placeBlock(0, 0, Block.HORIZONTAL, Collection.ONEBYSIX)).toBe(true);
		});
	});

	describe('doesCollide', () => {

	});

	describe('getBlockByCoord', () => {

	});

	describe('inBounds', () => {

	});

});