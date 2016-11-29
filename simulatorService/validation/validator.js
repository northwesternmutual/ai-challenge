const rules = require('./rules.js');
const async = require('async');
const Bluebird = require('bluebird');
const { ValidationError } = require('../src/errors');

function Validator() { }

Validator.prototype._createTasks = function (data) {
    return {
        _id: function (callback) {
            rules.id(data._id, function (err, result) {
                return callback(err ? err : null, err ? null : result);
            });
        },
        algorithmOneID: function (callback) {
            rules.algorithmOneID(data.algorithmOneID, function (err, result) {
                return callback(err ? err : null, err ? null : result);
            });
        },
        algorithmTwoID: function (callback) {
            rules.algorithmTwoID(data.algorithmTwoID, function (err, result) {
                return callback(err ? err : null, err ? null : result);
            });
        },
        simulations: function (callback) {
            rules.simulations(data.simulations, function (err, result) {
                return callback(err ? err : null, err ? null : result);
            });
        },
        collection: function (callback) {
            rules.collection(data.collection, function (err, result) {
                return callback(err ? err : null, err ? null : result);
            });
        }
    }
};

Validator.validateIncoming = function (data) {
    var tasks = Validator.prototype._createTasks(data);
    if (!data._id) {
        delete tasks._id;
    }

    return new Bluebird(function (resolve, reject) {
        async.parallel(tasks, function (err, result) {
            if (err) {
                return reject(new ValidationError(err.message));
            }
            return resolve({ response: result });
        });
    });
};

module.exports = Validator;
