const Bluebird = require('bluebird');
const Simulator = require('../src/game/Simulator.js');
const async = require('async');
const request = require('request');
const config = require('../utils/config.js');
const code = require('http-response-codes');
const { NoSuchCollectionError } = require('./errors');

export function getAlgorithms({ response }) {
	return new Bluebird(function(resolve, reject) {
		async.parallel({
			algOne: function(callback) {
				request(`${config.algorithmEndpoint}${response.collection}/${response.algorithmOneID}`, function(err, res, body) {
				    if(!err && res.statusCode === code.HTTP_NO_CONTENT) {
				    	return callback(new NoSuchCollectionError('collection does not exist'));
				    } else if (err) {
				        return callback(err);
				    }
				    return callback(null, body);
				});
			},
			algTwo: function(callback) {
				request(`${config.algorithmEndpoint}${response.collection}/${response.algorithmTwoID}`, function(err, res, body) {
				    if(!err && res.statusCode === code.HTTP_NO_CONTENT) {
				    	return callback(new NoSuchCollectionError('collection does not exist'));
				    } else if (err) {
				        return callback(err);
				    }
				    return callback(null, body);
				});
			}
		}, function(err, algorithms) {
			if(err) {
				return reject(err);
			}
			return resolve({ response, algorithms });
		});
	});
}

export function conductSimulation({ response, algorithms }) {

	return new Bluebird(function(resolve, reject) {
		new Simulator(JSON.parse(algorithms.algOne), JSON.parse(algorithms.algTwo), response.simulations).startSimulation( function(err, simulation) {
	        if(err) {
		        return reject(err);
			}
			return resolve({ response, algorithms, simulation });
	    });
	});

}

export function parseResponse({ response, algorithms, simulation }) {

	return {
		playerOne: {
		  wins: simulation.scorecard.playerOne,
		  losses: simulation.scorecard.playerTwo,
		  accuracy: simulation.accuracy.playerOne,
		  name: JSON.parse(algorithms.algOne).name,
		  id: response.algorithmOneID
		},
		playerTwo: {
		  wins: simulation.scorecard.playerTwo,
		  losses: simulation.scorecard.playerOne,
		  accuracy: simulation.accuracy.playerTwo,
		  name: JSON.parse(algorithms.algTwo).name,
		  id: response.algorithmTwoID
		}
	};
}
