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
} from '../../mock/tournament.js';
import { 
  executeTasks as executeTasksError,
  getMatches as getMatchesError,
  postResults as postResultsError,
  initialize as initializeError,
  postError as postErrorError
} from '../../mock/errors.js';
import log from '../../utils/logger';

let app;
let route;

const basePath = '/play';

function setupFakeRouter(dependencies) {
    app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    route = proxyquire
        .noCallThru()
        .load('../../routes/playRoute.js', { 
                '../src/tournament.js': Object.assign({}, {
                    createTasks,
                    sortResults,
                    parseResults
                }, dependencies)
        });

    app.use('/play', route);
}

describe('tournament route', () => {
    it('should return the status of the tournament', done => {
        setupFakeRouter({
            executeTasks,
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
            executeTasks,
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
            executeTasks,
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
            executeTasks: executeTasksError,
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
            executeTasks,
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
            executeTasks,
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