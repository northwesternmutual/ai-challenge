import Bluebird from 'bluebird';

export class ValidationError extends Bluebird.OperationalError {
    constructor(message) {
        super(message);
    }
}

export class NoSuchCollectionError extends Bluebird.OperationalError {
    constructor(message) {
        super(message);
    }
}

export class AlgorithmError extends Bluebird.OperationalError {
    constructor(message) {
        super(message);
    }
}

export class PlayerOneError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'PlayerOneError';
    }
}

export class PlayerTwoError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'PlayerTwoError';
    }
}

export class PlayerAllError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'PlayerAllError';
    }
}
