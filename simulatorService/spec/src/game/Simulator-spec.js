import Simulator from '../../../src/game/Simulator';
import {
	initializeSimulationError,
	algorithm
} from '../../../mock/algorithms';

let simulator;

describe('Simulator', () => {

    describe('constructor', () => {
        it('should create a new simulation', () => {
            simulator = new Simulator(algorithm, algorithm, 1000);
            expect(typeof simulator.averageAccuracy).toBe('function');
        });
    });

    describe('startSimulation', () => {
        it('should successfully run a simulation', () => {
            simulator = new Simulator(algorithm, algorithm, 1000);
            simulator.startSimulation((err, data) => {
                expect(data.scorecard.playerOne).toEqual(jasmine.any(Number));
                expect(data.scorecard.playerTwo).toEqual(jasmine.any(Number));
                expect(data.accuracy.playerOne).toEqual(jasmine.any(Number));
                expect(data.accuracy.playerTwo).toEqual(jasmine.any(Number));
            });
        });

        it('should throw error when the AI funtion #initializeSimulation of playerOne is buggy', () => {
            simulator = new Simulator(initializeSimulationError, algorithm, 1000);
            simulator.startSimulation((err, data) => {
                expect(data.scorecard.playerOne).toBe(0);
                expect(data.scorecard.playerTwo).toBe(1000);
                expect(data.accuracy.playerOne).toBe(0);
                expect(data.accuracy.playerTwo).toBe(0);
            });
        });

        it('should throw error when the AI funtion #initializeSimulation of playerTwo is buggy', () => {
            simulator = new Simulator(algorithm, initializeSimulationError, 1000);
            simulator.startSimulation((err, data) => {
                expect(data.scorecard.playerOne).toBe(1000);
                expect(data.scorecard.playerTwo).toBe(0);
                expect(data.accuracy.playerOne).toBe(0);
                expect(data.accuracy.playerTwo).toBe(0);
            });
        });

        it('should throw error when the AI funtion #initializeSimulation of both players are buggy', () => {
            simulator = new Simulator(initializeSimulationError, initializeSimulationError, 1000);
            simulator.startSimulation((err, data) => {
                expect(data.scorecard.playerOne).toBe(0);
                expect(data.scorecard.playerTwo).toBe(0);
                expect(data.accuracy.playerOne).toBe(0);
                expect(data.accuracy.playerTwo).toBe(0);
            });
        });

        it('should throw error when the AI funtion #shoot of both players are buggy', () => {
            simulator = new Simulator(initializeSimulationError, initializeSimulationError, 1000);
            simulator.startSimulation((err, data) => {
                expect(data.scorecard.playerOne).toBe(0);
                expect(data.scorecard.playerTwo).toBe(0);
                expect(data.accuracy.playerOne).toBe(0);
                expect(data.accuracy.playerTwo).toBe(0);
            });
        });

        it('should throw error when the AI funtion #shoot of player one is buggy', () => {
            simulator = new Simulator(initializeSimulationError, algorithm, 1000);
            simulator.startSimulation((err, data) => {
                expect(data.scorecard.playerOne).toBe(0);
                expect(data.scorecard.playerTwo).toBe(1000);
                expect(data.accuracy.playerOne).toBe(0);
                expect(data.accuracy.playerTwo).toBe(0);
            });
        });

        it('should throw error when the AI funtion #shoot of player two is buggy', () => {
            simulator = new Simulator(algorithm, initializeSimulationError, 1000);
            simulator.startSimulation((err, data) => {
                expect(data.scorecard.playerOne).toBe(1000);
                expect(data.scorecard.playerTwo).toBe(0);
                expect(data.accuracy.playerOne).toBe(0);
                expect(data.accuracy.playerTwo).toBe(0);
            });
        });
    });

});
