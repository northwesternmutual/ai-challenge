import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';
import bodyParser from 'body-parser';
import { data, Mongo } from '../mock/mongo.js';
import log from '../utils/logger';

const app = express();
const basePath = '/tournament';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    req.log = log.child({
        requestPath: req.url,
        httpVerb: req.method,
        params: req.params
    });
    req.log.info('Request received');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const route = proxyquire
    .noCallThru()
    .load('../routes/tournamentsRoute.js', { 
        '../controllers/mongo.js': Mongo 
});

app.use('/tournament', route);

app.use((req, res, next) => {
    const err = new Error('InvalidUri or InvalidHttpVerb');
    err.status = 400;
    next(err);
}, (err, req, res, next) => { // eslint-disable-line no-unused-vars
    req.log.error(err);
    res.status(err.status || code.HTTP_INTERNAL_SERVER_ERROR).end();
});

describe('tournament route', () => {
    it('should return the status of the tournament', done => {
        request(app)
            .get(`${basePath}/123abc`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).toEqual(data.items[0]);
                done();
            });
    });
    it('should return a 204 an algorithms doesn\'t exist', function (done) {
        request(app)
            .get(`${basePath}/ghi789`)
            .expect(204)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});