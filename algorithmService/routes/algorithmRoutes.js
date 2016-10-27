import code from 'http-response-codes';
import express from 'express';
import Mongo from '../controllers/mongo.js';
import Validator from '../validation/validator.js';

const mongoDriver = process.env.NM_ENV === 'testing' ? new Mongo() : new Mongo('ai_challenge');
const router = express.Router();

router.route('/:collection/:id')
  //get an algorithm
  .get((req, res, next) => {
      mongoDriver.getOne(req.params.collection, req.params.id, (err, result) => {
          if (err) {
              err.status = code.HTTP_INTERNAL_SERVER_ERROR;
              return next(err);
          } else if (!result) {
              res.sendStatus(code.HTTP_NO_CONTENT);
          } else {
              res.status(code.HTTP_OK).json(result);
          }
      });
  })
  //update or replace an algorithm
  .put((req, res, next) => {
      Validator.validateUpdate(req.body, (err, response) => {
          if (err) {
              err.status = code.HTTP_BAD_REQUEST;
              return next(err);
          } else {
              mongoDriver.updateOne(req.params.collection, req.params.id, response, (err, result, updated) => {
                  if (err) {
                      err.status = code.HTTP_INTERNAL_SERVER_ERROR;
                      return next(err);
                  } else if (!updated) {
                      res.sendStatus(code.HTTP_NO_CONTENT);
                  } else {
                      res.status(code.HTTP_OK).json(result);
                  }
              });
          }
      });
  })
  //remove an algorithm
  .delete((req, res, next) => {
      mongoDriver.deleteOne(req.params.collection, req.params.id, (err, result) => {
          if (err) {
              err.status = code.HTTP_INTERNAL_SERVER_ERROR;
              return next(err);
          } else if (!result) {
              const err = new Error('algorithm not deleted');
              err.status = code.HTTP_BAD_REQUEST;
              return next(err);
          } else {
              res.sendStatus(code.HTTP_NO_CONTENT);
          }
      });
  });

module.exports = router;
