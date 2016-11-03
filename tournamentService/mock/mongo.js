import _ from 'lodash';

export let data = {
    items: [
        {
            _id: '123abc',
            status: 'tournament completed',
            lastUpdated: Date.now(),
            results: []
        },
        {
            _id: '456def',
            status: 'tournament in progress',
            lastUpdated: Date.now(),
            results: []
        }
    ]
    
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
        data.items.push(Object.assign(document, { _id: '789ghi' }));
        return callback( null, document );
    }

    updateOne(collection, _id, update, callback) {
        let old = _.find(data.items, {_id});
        let index = _.indexOf(data.items, old);

        data.items.splice(index, 1, Object.assign({}, old, update));
        return callback(null, old, true);
    }

    deleteOne(collection, _id, callback) {
        let item = _.find(data.items, {_id});
        if(!item) {
            return callback(null, null);
        }
        _.remove(data.items, {_id});
        return callback(null, item);
    }

    deleteAll(collection, callback) {
        data.items = [];
        return callback( null, data.items );
    }
}