import Bluebird from 'bluebird';
import fs from 'fs';
import path from 'path';

export let data = {
    response: {
        _id: '123abc',
        status: 'tournament in progress',
        lastUpdated: Date.now(),
        results: []
    }
};

export function getMatches(numGames = 1000, collection) {

    return new Bluebird((resolve, reject) => {
        resolve({ matches: JSON.parse(fs.readFileSync(path.join(__dirname + '/data/matches.json')).toString()) });
    });
}

export function initialize({ matches }) {

    return new Bluebird((resolve, reject) => {
        resolve({ matches, result: data.response });
    });
}

export function createTasks({ matches, id }) {
    return { matches, tasks: {}, id };
}

export function executeTasks({ matches, tasks, id }) {

    return new Bluebird((resolve, reject) => {
        resolve({ matches, tasks: {}, id });
    });
}

export function parseResults({ matches, result, id }) {
    return { scorecard: {}, id };
}

export function sortResults({ scorecard, id }) {
    return { results: {}, id };
}

export function postResults({ results, id }) {
    return new Bluebird((resolve, reject) => {
        resolve();
    });
}

export function postError(err) {
    return new Bluebird((resolve, reject) => {
        resolve();
    });
}
