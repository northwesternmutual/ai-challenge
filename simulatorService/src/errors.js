import Bluebird from 'bluebird';

export class MongoError extends Bluebird.OperationalError {
    constructor(message) {
        super(message);
    }
}

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

export class SimulationError extends Bluebird.OperationalError {
    constructor(message) {
        super(message);
    }
}

export class InitializationError extends Bluebird.OperationalError {
    constructor(message) {
        super(message);
    }
}
