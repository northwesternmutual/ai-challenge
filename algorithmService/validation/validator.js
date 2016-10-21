import {
  email,
  id,
  initializeSimulation,
  initializeGame,
  startGame,
  shoot,
  endGame,
  date,
  name
} from './rules.js';
import async from 'async';

export default class Validator {
    _createTasks(data) {
        return {
            _id: callback => {
                id(data._id, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            initializeSimulation: callback => {
                initializeSimulation(data.initializeSimulation, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            shoot: callback => {
                shoot(data.shoot, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            email: callback => {
                email(data.email, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            initializeGame: callback => {
                initializeGame(data.initializeGame, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            startGame: callback => {
                startGame(data.startGame, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            endGame: callback => {
                endGame(data.endGame, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            date: callback => {
                date(data.date, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            name: callback => {
                name(data.name, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            }
        }
    }

    static validateNew(data, callback) {
        let tasks = Validator.prototype._createTasks(data);
        if (!data._id) {
            Reflect.deleteProperty(tasks, '_id');
        }
        async.parallel(tasks, (err, result) => {
            return callback(err ? err : null, err ? null : result);
        });
    }

    static validateUpdate(data, callback) {
        let tasks = Validator.prototype._createTasks(data);

        if (data.id) {
            return callback({message: 'cannot modify the id field'});
        }
        Reflect.deleteProperty(tasks, '_id');
        //almost everything is optional when doing an update so only keep the pending validation calls for the paramters that do
        if (!data.initializeSimulation) {
            Reflect.deleteProperty(tasks, 'initializeSimulation');
        }
        if (!data.shoot) {
            Reflect.deleteProperty(tasks, 'shoot');
        }
        if (!data.email) {
            Reflect.deleteProperty(tasks, 'email');
        }
        if (!data.initializeGame) {
            Reflect.deleteProperty(tasks, 'initializeGame');
        }
        if (!data.startGame) {
            Reflect.deleteProperty(tasks, 'startGame');
        }
        if (!data.endGame) {
            Reflect.deleteProperty(tasks, 'endGame');
        }
        if (!data.date) {
            Reflect.deleteProperty(tasks, 'date');
        }
        if (!data.name) {
            Reflect.deleteProperty(tasks, 'name');
        }
        async.parallel(tasks, (err, result) => {
            return callback(err ? err : null, err ? null : result);
        });
    }
}
