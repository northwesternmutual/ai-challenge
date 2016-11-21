import Game from '../../../src/game/Game';
import { error, algorithm } from '../../../mock/algorithms';
import Player from '../../../src/game/Player';
import AI from '../../../src/game/AI';
import { PlayerOneError, PlayerTwoError } from '../../../src/errors';

let game;
let playerOne;
let playerTwo;
let aiOne;
let aiTwo;
let one, two;

describe('Game', () => {

	beforeEach(() => {
		playerOne = new Player(Player.PLAYERONE);
		playerTwo = new Player(Player.PLAYERTWO);
		aiOne = new AI(algorithm, playerOne);
		aiTwo = new AI(algorithm, playerTwo);
		one = playerOne;
		two = playerTwo
		game = new Game(playerOne, playerTwo, aiOne, aiTwo);
	});

	describe('constructor', () => {
		it('should create a game', () => {
			expect(game.winner).toBe(null);
			expect(game.AIOne).toEqual(aiOne);
			expect(game.AITwo).toEqual(aiTwo);
		});
	});

	describe('initialize', () => {
		it('should initialize a game', () => {
			game.initialize();
			expect(game.winner).toBe(null);
		});
	});

	describe('playGame', () => {
		it('should successfully play a game', () => {
			game.initialize();
			game.playGame();
			expect(game.winner instanceof Player).toBe(true);
		});

		it('should throw error when the the AI funtions are wrong', () => {
			aiOne = new AI(error, playerOne);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			game.initialize();
			try {
				game.playGame();
				fail();
			} catch (e) {
				console.log(e);
				//expect(e instanceof PlayerTwoError).toBe(true);
				//expect(true).toBe(true);
			}
		});
	});

	describe('shoot', () => {
		it('should perform a shoot', () => {
			game.initialize();
			expect(Game.shoot(playerOne, 0, 0)).toEqual({ state: 2, block: null });
			aiOne.startGame();
			expect(Game.shoot(playerTwo, 0, 0)).toEqual({ state : 3, block : 0 });
		});
	});

	describe('isOver', () => {
		
	});

	describe('getRandomPlayer', () => {
		it('should generate a random player', () => {
			expect(game.getRandomPlayer() instanceof Player).toEqual(true);
		});
	});

});