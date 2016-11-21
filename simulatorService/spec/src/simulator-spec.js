import proxyquire from 'proxyquire';
import request from '../../mock/request';
import {
  getAlgorithms,
  conductSimulation,
  parseResponse
} from '../../src/simulator.js';
import { NoSuchCollectionError } from '../../src/errors';
import { goodQuery, badQueryOne, badQueryTwo } from '../../mock/query';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { getAlgorithmsResult } from '../../mock/algorithms';

const simulator = proxyquire
	.noCallThru()
    .load('../../src/simulator.js', {
		'request': request
	});

const algorithms = JSON.parse(fs.readFileSync(path.join(__dirname + '/../../mock/data/algorithms.json')).toString());

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
				.then(({ response, algorithms: after }) => {
					fail();
				})
				.catch(NoSuchCollectionError,  err => {
					done();
				});
		});

		it('should thow an error if the algorithm doesn\'t exsist', done => {
			simulator.getAlgorithms({ response: badQueryTwo })
				.then(({ response, algorithms: after }) => {
					fail();
				})
				.catch(NoSuchCollectionError,  err => {
					done();
				});
		});

	});

	describe('conductSimulation', () => {
		
		/*it('should successfully conduct a simulation', () => {
			simulator.conductSimulation({ response: goodQuery, algorithms: getAlgorithmsResult }).then(({ response, algorithms, simulation }) =>{
				expect(response).toEqual(goodQuery);
				expect(algorithms).toEqual(getAlgorithmsResult);
			});
		});*/

	});

	describe('parseResponse', () => {
		

	});

});