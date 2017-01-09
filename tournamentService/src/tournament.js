import async from 'async';
import code from 'http-response-codes';
import config from '../utils/config.js';
import request from 'request';
import qs from 'qs';
import Mongo from '../controllers/mongo.js';
import { mergeSort } from '../utils/mergeSort';
import Bluebird from 'bluebird';
import {
	MongoError,
	NoSuchCollectionError,
	AlgorithmError,
	SimulationError,
	InitializationError
} from '../src/errors';

export function getMatches(collection, numGames = 1000) {

    let matches = [];
    let algorithms = [];

    return new Bluebird((resolve, reject) => {
        request(`${config.algorithmEndpoint}${collection}`, (err, res, body) => {
            if (!err && res.statusCode === code.HTTP_NO_CONTENT) {
                let error = new NoSuchCollectionError('collection does not exist');
                error.status = code.HTTP_NO_CONTENT;
                return reject(error);
            } else if (err || res.statusCode !== 200) {
                return reject(new AlgorithmError(`algorithm error ${err.message}`));
            }
            algorithms = JSON.parse(body);

            for (let i = 0; i < algorithms.length; ++i) {
                for (let j = i + 1; j < algorithms.length; ++j) {
                    matches.push({
                        algorithmOne: algorithms[i],
                        algorithmTwo: algorithms[j],
                        url: '?' + qs.stringify({
                            algorithmOneID: algorithms[i]._id,
                            algorithmTwoID: algorithms[j]._id,
                            collection: collection,
                            simulations: numGames
                        })
                    });
                }
            }
            resolve({ matches });
        })
    });
}

export function initialize({ matches }) {
    return new Bluebird((resolve, reject) => {
        new Mongo('ai_challenge').insertOne('tournaments', {
            status: 'tournament in progress',
            lastUpdated: Date.now()
        }, (err, result) => {
            if (err) {
                return reject(new InitializationError('error posting tournament details'));
            }
            resolve({ matches, result });
        })
    });
}

export function createTasks({ matches, id }) {
    let tasks = {};

    matches.forEach((match, index) => {
        tasks['match_' + index] = callback => {
            request({
                method: 'GET',
                uri: `${config.simulationEndpiont}${match.url}`
            }, (error, response, body) => {
                if (error || (response.statusCode !== 200)) {
                    return callback(new Error('simulation service call failed'));
                } else {
                    return callback(null, body);
                }
            });
        };
    });

    return { matches, tasks, id };
}

export function executeTasks({ matches, tasks, id }) {

    return new Bluebird((resolve, reject) => {
        async.parallelLimit(tasks, 25, (err, result) => {
            if (err) {
                let error = new SimulationError(`simulation error ${err.message}`);
                error.id = id;
                return reject(error);
            }
            resolve({ matches, result, id });
        })
    });
}

export function parseResults({ matches, result, id }) {

    let scorecard = {};
    let playerOneWins;
    let playerTwoWins;

    matches.forEach((match, index) => {
        playerOneWins = JSON.parse(result[`match_${index}`]).playerOne.wins;
        playerTwoWins = JSON.parse(result[`match_${index}`]).playerTwo.wins;

        if (scorecard[matches[index].algorithmOne._id] === undefined) {
            scorecard[matches[index].algorithmOne._id] = {
                wins: playerOneWins,
                losses: playerTwoWins,
                name: matches[index].algorithmOne.name,
                email: matches[index].algorithmOne.email,
                id: matches[index].algorithmOne._id
            }
        } else {
            scorecard[matches[index].algorithmOne._id].wins += playerOneWins;
            scorecard[matches[index].algorithmOne._id].losses += playerTwoWins;
        }

        if (scorecard[matches[index].algorithmTwo._id] === undefined) {
            scorecard[matches[index].algorithmTwo._id] = {
                wins: playerTwoWins,
                losses: playerOneWins,
                name: matches[index].algorithmOne.name,
                email: matches[index].algorithmTwo.email,
                id: matches[index].algorithmTwo._id
            }
        } else {
            scorecard[matches[index].algorithmTwo._id].wins += playerTwoWins;
            scorecard[matches[index].algorithmTwo._id].losses += playerOneWins;
        }
    });

    return { scorecard, id };
}

export function sortResults({ scorecard, id }) {
    return { results: mergeSort(Object.keys(scorecard).map(k => scorecard[k])), id };
}

export function postResults({ results, id }) {
    return new Bluebird((resolve, reject) => {
        new Mongo('ai_challenge').updateOne('tournaments', id, {
            results,
            status: 'tournament completed',
            lastUpdated: Date.now()
        }, (err, result) => { // eslint-disable-line no-unused-vars
            if (err) {
                return reject(new MongoError(`tournamnt completed but there was an error uploading the results. Here are the results: ${results}`));
            }
            resolve();
        });
    });
}

export function postError(err) {
    return new Bluebird((resolve, reject) => {
        new Mongo('ai_challenge').updateOne('tournaments', err.id, {
            status: err.message,
            lastUpdated: Date.now()
        }, (err, result) => { // eslint-disable-line no-unused-vars
            if (err) {
                return reject(new MongoError('error posting tournament results'));
            }
            resolve();
        });
    });
}
