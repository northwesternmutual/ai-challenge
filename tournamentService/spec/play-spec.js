import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';
import bodyParser from 'body-parser';
import { 
  data,
  createTasks,
  executeTasks,
  sortResults,
  parseResults,
  getMatches,
  postResults,
  initialize,
  postError
} from '../mock/tournament.js';
import { 
  executeTasks as executeTasksError,
  getMatches as getMatchesError,
  postResults as postResultsError,
  initialize as initializeError,
  postError as postErrorError
} from '../mock/tournament_errors.js';
import log from '../utils/logger';

let app;
let route;

const basePath = '/play';

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
        .load('../routes/playRoute.js', { 
                '../src/tournament.js': dependencies
        });

    app.use('/play', route);

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
    it('should return the status of the tournament', done => {
        setupFakeRouter({
            createTasks,
            executeTasks,
            sortResults,
            parseResults,
            getMatches,
            postResults,
            initialize,
            postError
        });
        request(app)
            .get(`${basePath}/test`)
            .expect(202)
            .expect('Content-Type', /json/)
            .expect('Location', '123abc')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).toEqual(data.response);
                done();
            });
    });
    it('should return a 204 a collection doesn\'t exist', function (done) {
        setupFakeRouter({
            createTasks,
            executeTasks,
            sortResults,
            parseResults,
            getMatches: getMatchesError,
            postResults,
            initialize,
            postError
        });
        request(app)
            .get(`${basePath}/fake`)
            .expect(204)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should catch an instance of InitializationError', function (done) {
        setupFakeRouter({
            createTasks,
            executeTasks,
            sortResults,
            parseResults,
            getMatches,
            postResults,
            initialize: initializeError,
            postError
        });
        request(app)
            .get(`${basePath}/test`)
            .expect(500)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should catch an instance of SimulationError', function (done) {
        setupFakeRouter({
            createTasks,
            executeTasks: executeTasksError,
            sortResults,
            parseResults,
            getMatches,
            postResults,
            initialize,
            postError
        });
        request(app)
            .get(`${basePath}/test`)
            .expect(202)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should catch an instance of MongoError', function (done) {
        setupFakeRouter({
            createTasks,
            executeTasks,
            sortResults,
            parseResults,
            getMatches,
            postResults: postResultsError,
            initialize,
            postError
        });
        request(app)
            .get(`${basePath}/test`)
            .expect(202)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should catch an instance of MongoError', function (done) {
        setupFakeRouter({
            createTasks,
            executeTasks,
            sortResults,
            parseResults,
            getMatches,
            postResults: postResultsError,
            initialize,
            postError: postErrorError
        });
        request(app)
            .get(`${basePath}/test`)
            .expect(202)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});