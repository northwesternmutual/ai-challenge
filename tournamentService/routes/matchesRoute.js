import code from 'http-response-codes';
import express from 'express';
import { getMatches } from '../src/tournament.js';
import { NoSuchCollectionError } from '../src/errors';

const router = express.Router();

router.route('/:collection')
  .get((req, res, next) => {

      getMatches(req.params.collection, req.query.games)
          .then(data => res.status(code.HTTP_OK).json(data))
          .catch(NoSuchCollectionError, err => res.sendStatus(code.HTTP_NO_CONTENT)) // eslint-disable-line no-unused-vars
          .catch(err => next(err));

  });

module.exports = router;
