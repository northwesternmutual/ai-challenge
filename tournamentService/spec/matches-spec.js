import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';
import bodyParser from 'body-parser';
import { data, getMatches } from '../mock/tournament.js';
import { getMatches as getMatchesError } from '../mock/tournament_errors.js';
import log from '../utils/logger';

let app;
let route;

const basePath = '/matches';

function setupFakeRouter(dependencies) {
    app = express();

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

    route = proxyquire
        .noCallThru()
        .load('../routes/matchesRoute.js', { 
                '../src/tournament.js': dependencies
        });

    app.use('/matches', route);

    app.use((req, res, next) => {
        const err = new Error('InvalidUri or InvalidHttpVerb');
        err.status = 400;
        next(err);
    }, (err, req, res, next) => { // eslint-disable-line no-unused-vars
        req.log.error(err);
        res.status(err.status || code.HTTP_INTERNAL_SERVER_ERROR).end();
    });
}

describe('tournament route', () => {
    it('should return a list of matches', done => {
        setupFakeRouter({ getMatches });
        request(app)
            .get(`${basePath}/test`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).toEqual({ matches: data.matches });
                done();
            });
    });
    it('should return a 204 an algorithms doesn\'t exist', function (done) {
        setupFakeRouter({ getMatches: getMatchesError });
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