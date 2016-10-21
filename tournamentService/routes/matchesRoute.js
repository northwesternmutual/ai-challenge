import code from 'http-response-codes';
import express from 'express';
import { getMatches } from '../src/tournament.js';
import {
  NoSuchCollectionError,
  AlgorithmError
} from '../src/errors';

const router = express.Router();

router.route('/:collection')
  .get((req, res, next) => {

      getMatches(req.query.games, req.params.collection)
          .then( data => res.status(code.HTTP_OK).json(data) )
          .catch( NoSuchCollectionError, err => res.sendStatus(code.HTTP_NO_CONTENT) )
          .catch( err => next(err) );

  });

export default router;
