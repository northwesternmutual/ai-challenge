import Simulator from '../../../src/game/Simulator';
import { algorithm } from '../../../mock/algorithms';
import Player from '../../../src/game/Player';
import AI from '../../../src/game/AI';
import Game from '../../../src/game/Game';

let simulator;
let game;
let playerOne;
let playerTwo;
let aiOne;
let aiTwo;

describe('Simulator', () => {

	beforeEach(() => {
		simulator = new Simulator(algorithm, algorithm, 1000);
		playerOne = new Player(Player.PLAYERONE);
		playerTwo = new Player(Player.PLAYERTWO);
		aiOne = new AI(algorithm, playerOne);
		aiTwo = new AI(algorithm, playerTwo);
		game = new Game(playerOne, playerTwo, aiOne, aiTwo);
	});

	describe('constructor', () => {
		it('should create a new simulation', () => {
			expect(typeof simulator.averageAccuracy).toBe('function');
		});
	});

	describe('startSimulation', () => {

	});

});