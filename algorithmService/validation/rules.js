var _ = require('lodash');

const checkIfUndefined = data => {
    return new Promise((resolve, reject) => {
        if (data === undefined) {
            return reject(new Error('field is undefined'));
        } else {
            return resolve(data);
        }
    });
}

const checkIfNull = data => {
    return new Promise((resolve, reject) => {
        if (data === null) {
            return reject(new Error('field is null'));
        } else {
            return resolve(data);
        }
    });
}

const checkIfMinLength = data => {
    return new Promise((resolve, reject) => {
        if (data.length < 1) {
            return reject(new Error('field does not meet the minimum length requirement'));
        } else {
            return resolve(data);
        }
    });
}

const checkIfMalicious = data => {
    return new Promise((resolve, reject) => {
        var badKeywords = [/eval/, /setTimeout/, /setInterval/, /Function/, /exec/, /require/];
        _.forEach(badKeywords, keyword => {
            if(data.match(keyword)) {
                return reject(new Error('this code may be malicious'));
            }
        });
        return resolve(data);
    });
}

export function id(id, callback) {
    return checkIfUndefined(id)
        .then(checkIfNull)
        .then(checkIfMinLength)
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

export function email(email, callback) {
    return checkIfUndefined(email)
        .then(checkIfNull)
        .then(checkIfMinLength)
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

export function name(name, callback) {
    return checkIfUndefined(name)
        .then(checkIfNull)
        .then(checkIfMinLength)
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

export function initializeSimulation(initializeSimulation, callback) {
    return checkIfUndefined(initializeSimulation)
        .then(checkIfNull)
        .then(checkIfMalicious)
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

export function initializeGame(initializeGame, callback) {
    return checkIfUndefined(initializeGame)
        .then(checkIfNull)
        .then(checkIfMalicious)
        .then(checkIfMinLength)
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

export function startGame(startGame, callback) {
    return checkIfUndefined(startGame)
        .then(checkIfNull)
        .then(checkIfMalicious)
        .then(checkIfMinLength)
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

export function shoot(shoot, callback) {
    return checkIfUndefined(shoot)
        .then(checkIfNull)
        .then(checkIfMalicious)
        .then(checkIfMinLength)
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

export function endGame(endGame, callback) {
    return checkIfUndefined(endGame)
        .then(checkIfNull)
        .then(checkIfMalicious)
        .then(data => callback(null, data))
        .catch(err => callback(err));
}

export function date(date, callback) {
    return checkIfUndefined(date)
        .then(checkIfNull)
        .then(checkIfMinLength)
        .then(data => callback(null, data))
        .catch(err => callback(err));
}
