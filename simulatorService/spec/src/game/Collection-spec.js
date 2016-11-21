import Block from '../../../src/game/Block';
import Cell from '../../../src/game/Cell';
import Collection from '../../../src/game/Collection';
import Grid from '../../../src/game/Grid';

describe('Collection', () => {

	describe('constructor', () => {
		let collection = new Collection();

		let block1 	= new Block(Collection.ONEBYTWO, 2);
		let block2 	= new Block(Collection.ONEBYTHREE, 3);
		let block3 	= new Block(Collection.ONEBYFOUR, 4);
		let block4 	= new Block(Collection.ONEBYFIVE, 5);
		let block5	= new Block(Collection.ONEBYSIX, 6);

		it('should create blocks', () => {
			expect(collection.blocks.ONEBYTWO).toEqual(block1);
			expect(collection.blocks.ONEBYTHREE).toEqual(block2);
			expect(collection.blocks.ONEBYFOUR).toEqual(block3);
			expect(collection.blocks.ONEBYFIVE).toEqual(block4);
			expect(collection.blocks.ONEBYSIX).toEqual(block5);
		})
	});

	describe('initialize', () => {
		let collection = new Collection();
		collection.initialize();

		let block1 	= new Block(Collection.ONEBYTWO, 2);
		let block2 	= new Block(Collection.ONEBYTHREE, 3);
		let block3 	= new Block(Collection.ONEBYFOUR, 4);
		let block4 	= new Block(Collection.ONEBYFIVE, 5);
		let block5	= new Block(Collection.ONEBYSIX, 6);

		it('should initialize blocks', () => {
			expect(collection.blocks.ONEBYTWO).toEqual(block1);
			expect(collection.blocks.ONEBYTHREE).toEqual(block2);
			expect(collection.blocks.ONEBYFOUR).toEqual(block3);
			expect(collection.blocks.ONEBYFIVE).toEqual(block4);
			expect(collection.blocks.ONEBYSIX).toEqual(block5);
		})
	});

	describe('isPlaced', () => {
		let collection = new Collection();

		it('should not be placed', () => {
			expect(collection.isPlaced()).toBe(false);
		});

		it('still should not be placed', () => {
			collection.initialize();
			expect(collection.isPlaced()).toBe(false);
		});

		it('still should not be placed', () => {
			collection.initialize();
			collection.blocks.ONEBYTWO.isUsed = true;
			expect(collection.isPlaced()).toBe(false);
		});

		it('should be placed', () => {
			collection.initialize();
			collection.blocks.ONEBYTWO.isUsed = true;
			collection.blocks.ONEBYTHREE.isUsed = true;
			collection.blocks.ONEBYFOUR.isUsed = true;
			collection.blocks.ONEBYFIVE.isUsed = true;
			collection.blocks.ONEBYSIX.isUsed = true;
			expect(collection.isPlaced()).toBe(true);
		});
		
	});

	describe('isConquered', () => {
		let collection = new Collection();

		it('should not be conquered', () => {
			expect(collection.isConquered()).toBe(false);
		});

		it('should not be conquered', () => {
			collection.initialize();
			expect(collection.isConquered()).toBe(false);
		});

		it('should not be conquered', () => {
			collection.initialize();
			collection.blocks.ONEBYTWO.isConquered = true;
			expect(collection.isConquered()).toBe(false);
		});

		it('should be conquered', () => {
			collection.initialize();
			collection.blocks.ONEBYTWO.isConquered = true;
			collection.blocks.ONEBYTHREE.isConquered = true;
			collection.blocks.ONEBYFOUR.isConquered = true;
			collection.blocks.ONEBYFIVE.isConquered = true;
			collection.blocks.ONEBYSIX.isConquered = true;
			expect(collection.isConquered()).toBe(true);
		});

		it('should be conquered', () => {
			collection.initialize();
			for(var i=0; i<2; ++i) {
				collection.blocks.ONEBYTWO.hit();
			}
			for(var i=0; i<3; ++i) {
				collection.blocks.ONEBYTHREE.hit();
			}
			for(var i=0; i<4; ++i) {
				collection.blocks.ONEBYFOUR.hit();
			}
			for(var i=0; i<5; ++i) {
				collection.blocks.ONEBYFIVE.hit();
			}
			for(var i=0; i<6; ++i) {
				collection.blocks.ONEBYSIX.hit();
			}
			expect(collection.isConquered()).toBe(true);
		});
	});

	describe('getBlockByType', () => {
		let collection = new Collection();

		it('should return the appropiate blocks', () => {
			expect(collection.getBlockByType(Collection.ONEBYTWO)).toBe(collection.blocks.ONEBYTWO);
			expect(collection.getBlockByType(Collection.ONEBYTHREE)).toBe(collection.blocks.ONEBYTHREE);
			expect(collection.getBlockByType(Collection.ONEBYFOUR)).toBe(collection.blocks.ONEBYFOUR);
			expect(collection.getBlockByType(Collection.ONEBYFIVE)).toBe(collection.blocks.ONEBYFIVE);
			expect(collection.getBlockByType(Collection.ONEBYSIX)).toBe(collection.blocks.ONEBYSIX);
		});
	});

	describe('hasMoved', () => {
		let collection = new Collection();
		it('should have moved', () => {
			expect(collection.hasMoved({})).toBe(true);
		});
		it('should have not moved', () => {
			expect(collection.hasMoved(collection.blocks)).toBe(false);
		});
	});

	describe('constants', () => {
		it('should equal the right number', done => {
			expect(Collection.ONEBYTWO).toBe(0);
			expect(Collection.ONEBYTHREE).toBe(1);
			expect(Collection.ONEBYFOUR).toBe(2);
			expect(Collection.ONEBYFIVE).toBe(3);
			expect(Collection.ONEBYSIX).toBe(4);
			done();
		});
	});

});