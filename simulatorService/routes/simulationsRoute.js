const async = require('async');
const code = require('http-response-codes');
const config = require('../config.js');
const express = require('express');
const request = require('request');
const Simulator = require('../src/Simulator.js');
const Validator = require('../validation/validator.js');

const router = express.Router();

router.route('/')
  .get(function(req, res, next) {
      Validator.validateIncoming(req.query, function(err, response) {
          if (err) {
              err.status = code.HTTP_BAD_REQUEST;
              return next(err);
          } else {
              //run the simulation with the given paramters
              var numSims = response.simulations;
              var algOneID = response.algorithmOneID;
              var algTwoID = response.algorithmTwoID;
              var collection = response.collection;
              var simulation;

              //call the algorithm microservice with the given parameters(in parallel) to get the algorithms

              async.parallel({
                  algOne: function(callback) {
                    request(`${config.algorithmEndpoint}${collection}/${algOneID}`, function(err, res, body) {
                        if(err || res.statusCode !== 200) {
                            err.status = res.statusCode;
                            return callback(err);
                        }
                        return callback(null, body);
                    });
                  },
                  algTwo: function(callback) {
                    request(`${config.algorithmEndpoint}${collection}/${algTwoID}`, function(err, res, body) {
                        if(err || res.statusCode !== 200) {
                            err.status = res.statusCode;
                            return callback(err);
                        }
                        return callback(null, body);
                    });
                  }
              }, function(err, result) {
                  if(err) {
                    return next(err);
                  }
                  let algOneName = JSON.parse(result.algOne).name;
                  let algTwoName = JSON.parse(result.algTwo).name;

                  simulation = new Simulator({
                    initializeSimulation: JSON.parse(result.algOne).initializeSimulation,
                    initializeGame:       JSON.parse(result.algOne).initializeGame,
                    startGame:            JSON.parse(result.algOne).startGame,
                    shoot:                JSON.parse(result.algOne).shoot,
                    endGame:              JSON.parse(result.algOne).endGame,
                    name:                 JSON.parse(result.algOne).name
                  }, {
                    initializeSimulation: JSON.parse(result.algTwo).initializeSimulation,
                    initializeGame:       JSON.parse(result.algTwo).initializeGame,
                    startGame:            JSON.parse(result.algTwo).startGame,
                    shoot:                JSON.parse(result.algTwo).shoot,
                    endGame:              JSON.parse(result.algTwo).endGame,
                    name:                 JSON.parse(result.algTwo).name
                  }, numSims);

                  simulation.startSimulation( function(err, result) {
                      if(err) {
                          err.status = code.HTTP_INTERNAL_SERVER_ERROR;
                          return next(err);
                      }
                      result.playerOneID = algOneID;
                      result.playerTwoID = algTwoID;
                      result.playerOneName = algOneName;
                      result.playerTwoName = algTwoName;

                      var toReturn = {
                        playerOne: {
                          wins: result.scorecard.playerOne,
                          losses: result.scorecard.playerTwo,
                          accuracy: result.accuracy.playerOne,
                          name: algOneName,
                          id: algOneID
                        },
                        playerTwo: {
                          wins: result.scorecard.playerTwo,
                          losses: result.scorecard.playerOne,
                          accuracy: result.accuracy.playerTwo,
                          name: algTwoName,
                          id: algTwoID
                        }
                      };
                      
                      res.status(code.HTTP_OK).json(toReturn);
                  });
              });
          }
      });
  });

module.exports = router;
