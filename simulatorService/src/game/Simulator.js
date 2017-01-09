const AI = require('./AI.js');
const Game = require('./Game.js');
const Player = require('./Player.js');

function Simulator(algOneObj, algTwoObj, numSims) {
    this.playerOne = new Player(Player.PLAYERONE);
    this.playerTwo = new Player(Player.PLAYERTWO);

    this.AIOne = new AI(algOneObj, this.playerOne);
    this.AITwo = new AI(algTwoObj, this.playerTwo);

    this.game = new Game(this.playerOne, this.playerTwo, this.AIOne, this.AITwo);

    this.numSimulations = numSims;

    this.scorecard = {
        playerOne: 0,
        playerTwo: 0
    };

    this.accuracyByGame = {
        playerOne: [],
        playerTwo: []
    };

    this.shotsByGame = {
        playerOne: [],
        playerTwo: []
    };

    this.hitsByGame = {
        playerOne: [],
        playerTwo: []
    };

    this.averageAccuracy = function () {
        var playerOne = 0;
        var playerTwo = 0;

        for (var i = 0; i < numSims; ++i) {
            playerOne += this.accuracyByGame.playerOne[i];
            playerTwo += this.accuracyByGame.playerTwo[i];
        }

        return {
            playerOne: playerOne / numSims,
            playerTwo: playerTwo / numSims
        };
    };
}

Simulator.prototype.startSimulation = function (callback) {
    //initialize the AI's
    try { this.AIOne.initializeSimulation(); }
    catch (e1) {
        try { this.AITwo.initializeSimulation(); }
        catch (e2) {
            return callback(null, {
                scorecard: {
                    playerOne: 0,
                    playerTwo: 0
                },
                accuracy: {
                    playerOne: 0,
                    playerTwo: 0
                }
            });
        }
        return callback(null, {
            scorecard: {
                playerOne: 0,
                playerTwo: this.numSimulations
            },
            accuracy: {
                playerOne: 0,
                playerTwo: 0
            }
        });
    }

    try { this.AITwo.initializeSimulation(); }
    catch (e) {
        return callback(null, {
            scorecard: {
                playerOne: this.numSimulations,
                playerTwo: 0
            },
            accuracy: {
                playerOne: 0,
                playerTwo: 0
            }
        });
    }

    //for every simulation...
    for (var i = 0; i < this.numSimulations; ++i) {
        //games should be played in sync in case
        //the users AI adapts from previous games
        try {
            this.game.initialize();
            this.game.playGame();
        } //reset stuff for new game;
        catch (e) {
            switch (e.name) {
                case 'PlayerOneError':
                    return callback(null, {
                        scorecard: {
                            playerOne: 0,
                            playerTwo: this.numSimulations
                        },
                        accuracy: {
                            playerOne: 0,
                            playerTwo: 0
                        }
                    });
                    break;
                case 'PlayerTwoError':
                    return callback(null, {
                        scorecard: {
                            playerOne: this.numSimulations,
                            playerTwo: 0
                        },
                        accuracy: {
                            playerOne: 0,
                            playerTwo: 0
                        }
                    });
                    break;
                default:
                    return callback(null, {
                        scorecard: {
                            playerOne: 0,
                            playerTwo: 0
                        },
                        accuracy: {
                            playerOne: 0,
                            playerTwo: 0
                        }
                    });
                    break;
            }
        }

        //update scorecard
        if (this.game.winner.type === Player.PLAYERONE) {
            ++this.scorecard.playerOne;
        } else {
            ++this.scorecard.playerTwo;
        }

        //update accuracy
        this.accuracyByGame.playerOne.push(this.playerOne.accuracy());
        this.accuracyByGame.playerTwo.push(this.playerTwo.accuracy());

        this.shotsByGame.playerOne.push(this.playerOne.shotsTaken);
        this.shotsByGame.playerTwo.push(this.playerTwo.shotsTaken);

        this.hitsByGame.playerOne.push(this.playerOne.hitsDealt);
        this.hitsByGame.playerTwo.push(this.playerTwo.hitsDealt);
    }

    return callback(null, {
        scorecard: this.scorecard,
        accuracy: this.averageAccuracy()
    });
};

module.exports = Simulator;
