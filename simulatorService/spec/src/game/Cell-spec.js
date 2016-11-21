import Block from '../../../src/game/Block';
import Cell from '../../../src/game/Cell';
import Collection from '../../../src/game/Collection';

describe('Cell', () => {

	describe('constructor', () => {
		let cell = new Cell();

		it('should have a temperature of zero', () => {
			expect(cell.temperature).toBe(0);
		});
		it('should be empty', () => {
			expect(cell.state).toBe(Cell.TYPE_EMPTY);
		});
		it('should not have any blocks associated with the cell', () => {
			expect(cell.block).toBe(null);
		});
	});

	describe('setBlock', () => {
		let cell = new Cell();
		const block = new Block(Collection.ONEBYTWO, 2);

		it('should should have a block associated with the cell', () => {
			cell.setBlock(new Block(Collection.ONEBYTWO, 2));
			expect(cell.block).toEqual(block);
		});	
	});

	describe('constants', () => {
		it('should equal the right number', done => {
			expect(Cell.TYPE_EMPTY).toBe(0);
			expect(Cell.TYPE_BLOCK).toBe(1);
			expect(Cell.TYPE_MISS).toBe(2);
			expect(Cell.TYPE_CONQUERED).toBe(4);
			expect(Cell.TYPE_HIT).toBe(3);
			done();
		});
	});

});