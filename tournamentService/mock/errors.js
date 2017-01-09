import Bluebird from 'bluebird';
import {
	MongoError,
	NoSuchCollectionError,
	SimulationError,
	InitializationError
} from '../src/errors';

export function getMatches(numGames = 1000, collection) { //eslint-disable-line no-unused-vars
    return new Bluebird((resolve, reject) => {
        reject(new NoSuchCollectionError('collection does not exist'));
    });
}

export function initialize({ matches }) { //eslint-disable-line no-unused-vars
    return new Bluebird((resolve, reject) => {
        reject(new InitializationError('error posting tournament details'));
    });
}

export function executeTasks({ matches, tasks, id }) { //eslint-disable-line no-unused-vars
    return new Bluebird((resolve, reject) => {
        reject(new SimulationError('simulation error this is my error message'));
    });
}

export function postResults({ results, id }) { //eslint-disable-line no-unused-vars
    return new Bluebird((resolve, reject) => {
        reject(new MongoError('tournament completed but there was an error uploading the results. Here are the results: these are the results'));
    });
}

export function postError(err) { //eslint-disable-line no-unused-vars
    return new Bluebird((resolve, reject) => {
        reject(new MongoError('error posting tournament results'));
    });
}
