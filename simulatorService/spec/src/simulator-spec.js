import proxyquire from 'proxyquire';
import request from '../../mock/request';
import { parsed } from '../../mock/parsed';
import { NoSuchCollectionError } from '../../src/errors';
import { goodQuery, badQueryOne, badQueryTwo } from '../../mock/query';
import { getAlgorithmsResult } from '../../mock/algorithms';

const simulator = proxyquire
    .noCallThru()
    .load('../../src/simulator.js', {
        'request': request
    });

describe('simulator function', () => {

    describe('getAlgorithms', () => {

        it('should get the algorithms', done => {
            simulator.getAlgorithms({ response: goodQuery }).then(({ response, algorithms: after }) => {
                expect(response).toEqual(goodQuery);
                expect(after).toEqual(getAlgorithmsResult);
                done();
            });
        });

        it('should thow an error if the collection doesn\'t exsist', done => {
            simulator.getAlgorithms({ response: badQueryOne })
                .then(() => fail())
                .catch(NoSuchCollectionError, () => done());
        });

        it('should thow an error if the algorithm doesn\'t exsist', done => {
            simulator.getAlgorithms({ response: badQueryTwo })
                .then(() => fail())
                .catch(NoSuchCollectionError, () => done());
        });

    });

    describe('conductSimulation', () => {

        it('should successfully conduct a simulation', done => {
            simulator.conductSimulation({ response: goodQuery, algorithms: getAlgorithmsResult })
                .then(({ response, algorithms, simulation }) => {
                    expect(true).toBe(true);
                    expect(response).toEqual(goodQuery);
                    expect(algorithms).toEqual(getAlgorithmsResult);
                    expect(simulation.scorecard.playerOne).toEqual(jasmine.any(Number));
                    expect(simulation.scorecard.playerTwo).toEqual(jasmine.any(Number));
                    expect(simulation.accuracy.playerOne).toEqual(jasmine.any(Number));
                    expect(simulation.accuracy.playerTwo).toEqual(jasmine.any(Number));
                    done();
                });
        });

    });

    describe('parseResponse', () => {

        it('should properly parse a simulation response', done => {
            let result = simulator.parseResponse({ response: goodQuery, algorithms: getAlgorithmsResult, simulation: {
                scorecard: { playerOne: 6, playerTwo: 4 },
                accuracy: {
                    playerOne: 0.35892255892255903,
                    playerTwo: 0.3565656565656566
                }
            }});
            expect(result).toEqual(parsed);
            done();
        });

    });

});
