import Block from '../../../src/game/Block';
import Collection from '../../../src/game/Collection';

describe('Block', () => {

    describe('constructor', () => {
        let block = new Block(Collection.ONEBYTWO, 2);

        it('should have a length of two', () => {
            expect(block.length).toBe(2);
        });
        it('should have a correct type', () => {
            expect(block.type).toBe(Collection.ONEBYTWO);
        });
    });

    describe('initialize', () => {
        let block = new Block(Collection.ONEBYTWO, 2);

        it('should have zero damage', () => {
            expect(block.damage).toBe(0);
        });
        it('should not be conquered', () => {
            expect(block.isConquered).toBe(false);
        });
        it('should have the initial location', () => {
            expect(block.location).toEqual({
                x: null,
                y: null,
                direction: null
            });
        });
        it('should not be used', () => {
            expect(block.isUsed).toBe(false);
        });
        it('should not have any associated cels', () => {
            expect(block.cells).toEqual([]);
        });
    });

    describe('hit', () => {
        let block = new Block(Collection.ONEBYFIVE, 5);

        it('should have been damaged', () => {
            block.hit();
            expect(block.damage).toBe(1);
        });

        it('should have been damaged', () => {
            for (var i = 0; i < 4; ++i) {
                block.hit();
            }
            expect(block.damage).toBe(5);
            expect(block.isConquered).toBe(true);
        });

        it('shouldn\'t be able to be hit after it\'s conquered', () => {
            block.hit();
            expect(block.damage).toBe(5);
            expect(block.isConquered).toBe(true);
        });
    });

    describe('constants', () => {
        it('should equal the right number', done => {
            expect(Block.HORIZONTAL).toBe(0);
            expect(Block.VERTICAL).toBe(1);
            done();
        });
    });

});
