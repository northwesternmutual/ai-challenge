import request from '../request';

export let tasks = {

    match_0: callback => { //eslint-disable-line camelcase
        request({
            method: 'GET',
            uri: 'simulationEndpiont?algorithmOneID=123abc&algorithmTwoID=456def&collection=my_collection&simulations=1000'
        }, (error, response, body) => {
            if (error || (response.statusCode !== 200)) {
                return callback(new Error('simulation service call failed'));
            } else {
                return callback(null, body);
            }
        });
    },
    match_1: callback => { //eslint-disable-line camelcase
        request({
            method: 'GET',
            uri: 'simulationEndpiont?algorithmOneID=123abc&algorithmTwoID=789ghi&collection=my_collection&simulations=1000'
        }, (error, response, body) => {
            if (error || (response.statusCode !== 200)) {
                return callback(new Error('simulation service call failed'));
            } else {
                return callback(null, body);
            }
        });
    },
    match_2: callback => { //eslint-disable-line camelcase
        request({
            method: 'GET',
            uri: 'simula`tionEndpiont?algorithmOneID=456def&algorithmTwoID=789ghi&collection=my_collection&simulations=1000'
        }, (error, response, body) => {
            if (error || (response.statusCode !== 200)) {
                return callback(new Error('simulation service call failed'));
            } else {
                return callback(null, body);
            }
        });
    }

}
