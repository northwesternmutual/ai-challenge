const code = require('http-response-codes');
const express = require('express');
const Validator = require('../validation/validator.js');
const {
  getAlgorithms,
  conductSimulation,
  parseResponse
} = require('../src/simulator');
const {
  ValidationError,
  NoSuchCollectionError
} = require('../src/errors');

const router = express.Router();

router.route('/')
  .get(function (req, res, next) {
      Validator.validateIncoming(req.query)
        .then(getAlgorithms)
        .then(conductSimulation)
        .then(parseResponse)
        .then(response => res.status(code.HTTP_OK).json(response))
        .catch(ValidationError, err => {
            err.status = code.HTTP_BAD_REQUEST;
            return next(err);
        })
        .catch(NoSuchCollectionError, () => res.sendStatus(code.HTTP_NO_CONTENT))
  });

module.exports = router;
