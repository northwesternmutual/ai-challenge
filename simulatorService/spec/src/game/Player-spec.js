import Player from '../../../src/game/Player';
import Grid from '../../../src/game/Grid';
import Game from '../../../src/game/Game';

let player;
let grid;

describe('Player', () => {

	beforeEach(() => {
		player = new Player(Player.PLAYERONE);
		grid = new Grid();
	});

	describe('constructor', () => {
		it('should create a new player', () => {
			expect(player.type).toBe(Player.PLAYERONE);
			expect(player.grid).toEqual(grid);
			expect(player.shotsTaken).toBe(0);
			expect(player.hitsDealt).toBe(0);
			expect(typeof player.accuracy).toBe('function');
		});

		it('should calculate the proper accuracy', () => {
			player.shotsTaken = 4;
			player.hitsDealt = 3;
			expect(player.accuracy()).toBe(0.75);
		});
	});

	describe('initialize', () => {
		it('should initialize a player', () => {
			player.initialize();
			grid.initialize();
			expect(player.shotsTaken).toBe(0);
			expect(player.hitsDealt).toBe(0);
			expect(player.grid).toEqual(grid);
		});
	});

	describe('constants', () => {
		it('should equal the right number', done => {
			expect(Player.PLAYERONE).toBe(1);
			expect(Player.PLAYERTWO).toBe(2);
			done();
		});
	});

});