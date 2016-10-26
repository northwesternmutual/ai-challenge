import _ from 'lodash';

export let data = {
    items: [
        {
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
        {
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
        {
            _id: '789ghi',
            email: 'frankgreco@northwesternmutual.com',
            name: 'frank greco jr',
            initializeSimulation: 'this is my function body',
            initializeGame: 'this is my function body',
            startGame: 'this is my function body',
            shoot: 'this is my function body',
            endGame: 'this is my function body',
            date: Date.now(),
        }
    ],
    
};

export class Mongo {
    contructor(db = 'test') {
        return;
    }

    getOne(collection, _id, callback) {
        return callback( null, _.find(data.items, {_id}) );
    }

    getAll(collection, callback) {
        _.forEach(data.items, algorithm => {
            callback( null, algorithm );
        }).then( callback(null, null) );
    }

    insertOne(collection, document, callback) {
        data.items.push(document);
        return callback( null, document);
    }

    deleteAll(collection, callback) {
        data.items = [];
        return callback( null, data.items );
    }
}