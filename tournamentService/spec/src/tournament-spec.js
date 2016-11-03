import proxyquire from 'proxyquire';
import { 
	data,
	Mongo } from '../../mock/mongo.js';
import request from '../../mock/request.js';
import {
  createTasks,
  executeTasks,
  sortResults,
  parseResults,
  getMatches,
  postResults,
  initialize,
  postError
} from '../../src/tournament.js';
import {
  NoSuchCollectionError,
  AlgorithmError,
  InitializationError
} from '../../src/errors';
import fs from 'fs';
import _ from 'lodash';
import { results } from '../../mock/data/results.js';
import { tasks } from '../../mock/data/tasks.js';
import { scorecard } from '../../mock/data/scorecard.js';
import { sorted } from '../../mock/data/sorted.js';

const tournament = proxyquire
	.noCallThru()
    .load('../../src/tournament.js', { 
		'../controllers/mongo.js': Mongo,
		'request': request
	});

const root = process.cwd();
const matches = JSON.parse(fs.readFileSync(root + '/mock/data/matches.json').toString());

describe('tournament function', () => { 

	describe('getMatches', () => {

		it('should create a list of matches', () => {
			tournament.getMatches('my_collection', 1000).then(({ matches }) => {
				expect(matches).toEqual(JSON.parse(fs.readFileSync(root + '/mock/data/matches.json').toString()));
			});
		});

		it('should create a list of matches even though we haven\'t specified how many games to play', () => {
			tournament.getMatches('my_collection').then(({ matches }) => {
				expect(matches).toEqual(JSON.parse(fs.readFileSync(root + '/mock/data/matches.json').toString()));
			});
		});

		it('should throw an AlgorithmError is the endpoint isn\'t valid', done => {
			tournament.getMatches('my_collection/bad_path', 1000)
				.then(({ matches }) => {
					fail();
				})
				.catch(AlgorithmError, err => {
					done();
				});
		});

		it('should throw a NoSuchCollectionError if the collection doesn\'t exist', done => {
			tournament.getMatches('wrong_collection', 1000)
				.then(({ matches }) => {
					fail();
				})
				.catch(NoSuchCollectionError, err => {
					done();
				});
		});


	});

	describe('initialize', () => {
		
		it('should insert the tournament into the database', done => {
			tournament.initialize({ matches }).then(({ matches: after, result }) => {
				expect(matches).toEqual(after);
				expect(result).toEqual(data.items[data.items.length-1]);
				done();
			});
		});
	});

	describe('createTasks', () => {
		it('should return a list of tasks', done => {
			let result = tournament.createTasks({ matches, id: '789ghi' });
			expect(result.id).toBe('789ghi');
			expect(matches).toEqual(result.matches);
			expect(Object.keys(result.tasks).length).toBe(3);
			_.forEach(result.tasks, (value, key) => {
				expect(typeof value).toBe('function');
			});
			done();
		})

	});

	describe('executeTasks', () => {
		
		it('should return the results', done => {
			tournament.executeTasks({ matches, tasks, id: '789ghi' }).then(({ matches: after, result, id }) => {
				expect(after).toEqual(matches);
				expect(id).toBe('789ghi');
				expect(result).toEqual(results);
				done();
			});
		});

	});

	describe('parseResults', () => {
		
		it('should parse the results', done => {
			let result = tournament.parseResults({matches, result: results, id: '789ghi'});
			expect(result.id).toBe('789ghi');
			expect(result.scorecard).toEqual(scorecard);
			done();
		});

	});

	describe('sortResults', () => {
		
		it('should properly sort the results', done => {
			let result = tournament.sortResults({ scorecard, id: '789ghi' });
			expect(result.id).toBe('789ghi');
			if(result.results.length < 2) done();
			for(let i=1; i<result.results.length; ++i) {
				expect(result.results[i-1].wins >= result.results[i].wins).toEqual(true);
			}
			done();
		})

	});

	describe('postResults', () => {
		it('should update the tournament in the database', done => {
			tournament.postResults({ results: sorted, id: '789ghi' }).then(() => {
				expect(data.items[data.items.length-1]).toEqual({
					_id: '789ghi',
		            status: 'tournament completed',
		            lastUpdated: data.items[data.items.length-1].lastUpdated,
		            results: sorted
				});
				done();
			});
		});
	});

	describe('postError', () => {
		it('should update the tournament in the database to show an error', done => {
			tournament.postError({
				id: '789ghi',
				message: 'this is an error'
			}).then(() => {
				let updatedEntry = data.items[data.items.length-1];
				expect(updatedEntry._id).toBe('789ghi');
				expect(updatedEntry.status).toBe('this is an error');
				expect(updatedEntry.lastUpdated).toBeTruthy();
				done();
			});
		});
	});

});