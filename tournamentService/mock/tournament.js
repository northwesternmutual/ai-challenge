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

export function getMatches(numGames = 1000, collection) { //eslint-disable-line no-unused-vars
    return new Bluebird((resolve, reject) => { //eslint-disable-line no-unused-vars
        resolve({ matches: JSON.parse(fs.readFileSync(path.join(__dirname + '/data/matches.json')).toString()) });
    });
}

export function initialize({ matches }) {
    return new Bluebird((resolve, reject) => { //eslint-disable-line no-unused-vars
        resolve({ matches, result: data.response });
    });
}

export function createTasks({ matches, id }) {
    return { matches, tasks: {}, id };
}

export function executeTasks({ matches, tasks, id }) { //eslint-disable-line no-unused-vars
    return new Bluebird((resolve, reject) => { //eslint-disable-line no-unused-vars
        resolve({ matches, tasks: {}, id });
    });
}

export function parseResults({ matches, result, id }) { //eslint-disable-line no-unused-vars
    return { scorecard: {}, id };
}

export function sortResults({ scorecard, id }) { //eslint-disable-line no-unused-vars
    return { results: {}, id };
}

export function postResults({ results, id }) { //eslint-disable-line no-unused-vars
    return new Bluebird((resolve, reject) => { //eslint-disable-line no-unused-vars
        resolve();
    });
}

export function postError(err) { //eslint-disable-line no-unused-vars
    return new Bluebird((resolve, reject) => { //eslint-disable-line no-unused-vars
        resolve();
    });
}
