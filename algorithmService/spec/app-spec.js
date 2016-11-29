import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';
import log from '../utils/logger';

const fake = express.Router();

fake.use('/error', (req, res, next) => {
    next(new Error('test error'));
});

fake.use('/', (req, res, next) => { // eslint-disable-line no-unused-vars
    res.cookie('cookie', req.cookies);
    res.json({});
});
var app = proxyquire('../app', {
    './routes/algorithmRoutes': fake,
    './routes/algorithmsRoutes': fake,
    './routes/doc': fake,
    './routes/health': fake
});

describe('the algorithm application path', () => {
    it('should be registered for algorithms', done => {
        request(app)
            .get('/algorithms/test')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(err =>  {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should be registered for algorithms by id', done => {
        request(app)
            .get('/algorithm/test/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should be registered for health', done => {
        request(app)
            .get('/health')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should be registered for doc', done => {
        request(app)
            .get('/doc')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should set child logger on request', done => {
        spyOn(log, 'child').and.callThrough();
        request(app)
            .get('/health')
            .set('host', 'testHost')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                expect(log.child).toHaveBeenCalledWith({
                    requestPath: '/health',
                    httpVerb: 'GET',
                    params: {},
                    headers: { 'host': 'testHost', 'accept-encoding': 'gzip, deflate', 'user-agent': 'node-superagent/1.8.4', connection: 'close' }
                });
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should provide a 400 response for invalid paths', done => {
        request(app)
            .get('/badaddress')
            .expect(400)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
