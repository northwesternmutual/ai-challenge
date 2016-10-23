const code = require('http-response-codes');
const express = require('express');
const Simulator = require('../src/Simulator.js');
const Validator = require('../validation/validator.js');
const {
  getAlgorithms,
  conductSimulation,
  parseResponse
} = require('../src/simulator');

const router = express.Router();

router.route('/')
  .get(function(req, res, next) {
      Validator.validateIncoming(req.query)
        .then(getAlgorithms)
        .then(conductSimulation)
        .then(parseResponse)
        .then(response => res.status(code.HTTP_OK).json(response));
  });

module.exports = router;
