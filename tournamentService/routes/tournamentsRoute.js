import code from 'http-response-codes';
import express from 'express';
import Mongo from '../controllers/mongo.js';

const mongoDriver = process.env.NM_ENV === 'testing' ? new Mongo() : new Mongo('ai_challenge');
const router = express.Router();

router.route('/:id')

  .get((req, res, next) => {
      mongoDriver.getOne('tournaments', req.params.id, (err, result) => {
          if (err) {
              err.status = code.HTTP_INTERNAL_SERVER_ERROR;
              return next(err);
          } else if (!result) {
              res.sendStatus(code.HTTP_NO_CONTENT);
          } else {
              res.status(code.HTTP_OK).json(result);
          }
      });
  });

module.exports = router;
