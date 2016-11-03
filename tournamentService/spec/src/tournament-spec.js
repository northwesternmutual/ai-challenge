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
import matchesList from '../../mock/data/matches.json';
import fs from 'fs';
import _ from 'lodash';

const tournament = proxyquire
	.noCallThru()
    .load('../../src/tournament.js', { 
		'../controllers/mongo.js': Mongo,
		'request': request
	});

const root = process.cwd();

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
			const before = JSON.parse(fs.readFileSync(root + '/mock/data/matches.json').toString());
			tournament.initialize({ matches: before }).then(({ matches: after, result }) => {
				expect(before).toEqual(after);
				expect(result).toEqual(data.items[data.items.length-1]);
				done();
			});
		});
	});

	describe('createTasks', () => {
		const matches = JSON.parse(fs.readFileSync(root + '/mock/data/matches.json').toString());
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
		
	});

	describe('parseResults', () => {
		
	});

	describe('sortResults', () => {
		
	});

	describe('postResults', () => {
		
	});

	describe('postError', () => {
		
	});

});