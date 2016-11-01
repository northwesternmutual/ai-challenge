import Bluebird from 'bluebird';

export let data = {
    response: {
        _id: '123abc',
        status: 'tournament in progress',
        lastUpdated: Date.now(),
        results: []
    },
    matches:  [
        {
            algorithmOne: {
                _id: '123abc',
                email: 'frankgreco@northwesternmutual.com',
                name: 'frank greco jr',
                initializeSimulation: 'this is my function body',
                initializeGame: 'this is my function body',
                startGame: 'this is my function body',
                shoot: 'this is my function body',
                endGame: 'this is my function body',
                date: Date.now(),
            },
            algorithmTwo: {
                _id: '456def',
                email: 'frankgreco@northwesternmutual.com',
                name: 'frank greco jr',
                initializeSimulation: 'this is my function body',
                initializeGame: 'this is my function body',
                startGame: 'this is my function body',
                shoot: 'this is my function body',
                endGame: 'this is my function body',
                date: Date.now(),
            },
            url: '?paramOne=one&paramTwo=two'
        }
    ]
};

export function getMatches(numGames = 1000, collection) {

    return new Bluebird((resolve, reject) => {
        resolve({ matches: data.matches });
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
