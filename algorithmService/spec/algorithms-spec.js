import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';
import bodyParser from 'body-parser';
import { data, Mongo } from '../mock/mongo.js';
import log from '../utils/logger';

const app = express();
const basePath = '/algorithms';

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
    .load('../routes/algorithmsRoutes.js', { 
        '../controllers/mongo.js': Mongo 
});

app.use('/algorithms', route);

app.use((req, res, next) => {
    const err = new Error('InvalidUri or InvalidHttpVerb');
    err.status = 400;
    next(err);
}, (err, req, res, next) => { // eslint-disable-line no-unused-vars
    req.log.error(err);
    res.status(err.status || code.HTTP_INTERNAL_SERVER_ERROR).end();
});

describe('algorithms route', () => {
    it('should return all algorithms', done => {
        request(app)
            .get(`${basePath}/test`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).toEqual(data.items);
                done();
            });
    });
    it('should create a new algorithm', function (done) {
        let item = {
            _id: '012jkl',
            email: 'frankgreco@northwesternmutual.com',
            name: 'frank greco jr',
            initializeSimulation: 'this is my function body',
            initializeGame: 'this is my function body',
            startGame: 'this is my function body',
            shoot: 'this is my function body',
            endGame: 'this is my function body',
            date: Date.now(),
        };
        request(app)
            .post(`${basePath}/test`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).toEqual(item)
                done();
            });
    });
    it('should delete all algorithms', function (done) {
        request(app)
            .delete(`${basePath}/test`)
            .expect(204)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should return a 204 if no algorithms exist', function (done) {
        request(app)
            .get(`${basePath}/test`)
            .expect(204)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});