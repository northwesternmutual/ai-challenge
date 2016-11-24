import Game from '../../../src/game/Game';
import { 
	initializeGameError,
	startGameError,
	shootError,
	endGameError,
	algorithm
} from '../../../mock/algorithms';
import Player from '../../../src/game/Player';
import AI from '../../../src/game/AI';
import { PlayerOneError, PlayerTwoError, MongoError } from '../../../src/errors';

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
		one = playerOne;
		two = playerTwo;
	});

	describe('constructor', () => {
		it('should create a game', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			expect(game.winner).toBe(null);
			expect(game.AIOne).toEqual(aiOne);
			expect(game.AITwo).toEqual(aiTwo);
		});
	});

	describe('initialize', () => {
		it('should initialize a game', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			game.initialize();
			expect(game.winner).toBe(null);
		});

		it('should throw error when the AI funtion #initializeGame of playerOne is buggy', () => {
			aiOne = new AI(initializeGameError, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.initialize();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerOneError');
			}
		});

		it('should throw error when the AI funtion #initializeGame of playerTwo is buggy', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(initializeGameError, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.initialize();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerTwoError');
			}
		});

		it('should throw error when the AI funtion #initializeGame of both players are buggy', () => {
			aiOne = new AI(initializeGameError, playerOne);
			aiTwo = new AI(initializeGameError, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.initialize();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerAllError');
			}
		});
	});

	describe('playGame', () => {
		it('should successfully play a game', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			game.initialize();
			game.playGame();
			expect(game.winner instanceof Player).toBe(true);
		});

		it('should throw error when player one\'s #startGame function is buggy', () => {
			aiOne = new AI(startGameError, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.playGame();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerOneError');
			}
		});

		it('should throw error when player two\'s #startGame function is buggy', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(startGameError, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.playGame();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerTwoError');
			}
		});

		it('should throw error when all player\'s #startGame functions are buggy', () => {
			aiOne = new AI(startGameError, playerOne);
			aiTwo = new AI(startGameError, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.playGame();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerAllError');
			}
		});

		it('should throw error when player one\'s #shoot function is buggy', () => {
			aiOne = new AI(shootError, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.initialize();
				game.playGame();
				expect(false).toBe(true);
			} catch (e) {
				let tmp = e.name;
				expect(['PlayerOneError', 'PlayerTwoError'].indexOf(tmp)).toBeGreaterThan(-1);
			}
		});

		it('should throw error when player two\'s #shoot function is buggy', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(shootError, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.initialize();
				game.playGame();
				expect(false).toBe(true);
			} catch (e) {
				let tmp = e.name;
				expect(['PlayerOneError', 'PlayerTwoError'].indexOf(tmp)).toBeGreaterThan(-1);
			}
		});

		it('should throw error when all player\'s #shoot functions are buggy', () => {
			aiOne = new AI(shootError, playerOne);
			aiTwo = new AI(shootError, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.initialize();
				game.playGame();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerAllError');
			}
		});

		it('should throw error when player one\'s #endGame function is buggy', () => {
			aiOne = new AI(endGameError, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.initialize();
				game.playGame();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerOneError');
			}
		});

		it('should throw error when player two\'s #endGame function is buggy', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(endGameError, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.initialize();
				game.playGame();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerTwoError');
			}
		});

		it('should throw error when all player\'s #endGame functions are buggy', () => {
			aiOne = new AI(endGameError, playerOne);
			aiTwo = new AI(endGameError, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			try {
				game.initialize();
				game.playGame();
				expect(false).toBe(true);
			} catch (e) {
				expect(e.name).toBe('PlayerAllError');
			}
		});
	});

	describe('shoot', () => {
		it('should perform a shoot', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			game.initialize();
			expect(Game.shoot(playerOne, 0, 0)).toEqual({ state: 2, block: null });
			aiOne.startGame();
			expect(Game.shoot(playerTwo, 0, 0)).toEqual({ state : 3, block : 0 });
		});

		it('should not be able to shoot twice', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			game.initialize();
			Game.shoot(playerOne, 0, 0);
			expect(Game.shoot(playerOne, 0, 0)).toEqual({ state: null, block: null });
		});

		it('should still be able to shoot if shot is invalid', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			game.initialize();
			Game.shoot(playerOne, -1, 0);
			expect(Game.shoot(playerOne, 0, 0)).toEqual({ state: 2, block: null });
		});

		it('opponent should still be able to shoot if shot is invalid', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			game.initialize();
			Game.shoot(playerOne, -1, 0);
			aiOne.startGame();
			expect(Game.shoot(playerTwo, 0, 0)).toEqual({ state: 3, block: 0 });
			expect(Game.shoot(playerTwo, 0, 0)).toEqual({ state: null, block: null });
		});
	});

	describe('isOver', () => {
		
	});

	describe('getRandomPlayer', () => {
		it('should generate a random player', () => {
			aiOne = new AI(algorithm, playerOne);
			aiTwo = new AI(algorithm, playerTwo);
			game = new Game(playerOne, playerTwo, aiOne, aiTwo);
			expect(game.getRandomPlayer() instanceof Player).toEqual(true);
		});
	});

});