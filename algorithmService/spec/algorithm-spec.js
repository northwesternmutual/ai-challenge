import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';
import bodyParser from 'body-parser';
import { data, Mongo } from '../mock/mongo.js';

const app = express();
const basePath = '/algorithm';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const route = proxyquire
    .noCallThru().load('../routes/algorithmRoutes.js', {
        '../controllers/mongo.js': Mongo
    });

app.use('/algorithm', route);

describe('algorithm route', () => {
    it('should return a single algorithm', done => {
        request(app)
            .get(`${basePath}/test/123abc`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).toEqual(data.items[0]);
                done();
            });
    });
    it('should update an algorithm', done => {
        let item = {
            name: 'new name'
        };
        let old = data.items[0];
        request(app)
            .put(`${basePath}/test/123abc`)
            .send(item)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).toEqual(old)
                done();
            });
    });
    it('should reject a new algorithm that might contain malicious code (eval)', done => {
        let item = {
            initializeSimulation: 'eval(this is my function body)'
        };
        request(app)
            .put(`${basePath}/test/123abc`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    expect(res.status).toEqual(400);
                    return done();
                }
                fail();
            });
    });
    [
        'var foo=require("module-name");',
        'var foo=require(\n"module-name"\n);',
        'var foo=require(\n"module-name");',
        'var foo=require(\n"module-name"\n\n\n);',
        'var foo=require(\n\n"module-name"\n);'
    ].forEach(item => {
        it('should reject a new algorithm that might contain malicious code (require)', done => {
            request(app)
              .put(`${basePath}/test/123abc`)
              .send({ initializeSimulation: item })
              .expect('Content-Type', /json/)
              .expect(400)
              .end((err, res) => {
                  if (err) {
                      expect(res.status).toEqual(400);
                      return done();
                  }
                  fail();
              });
        });
    });
    it('should reject a new algorithm that might contain malicious code (setInterval)', done => {
        let item = {
            initializeSimulation: 'setInterval(function(){console.log()}, 2000)'
        };
        request(app)
            .put(`${basePath}/test/123abc`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    expect(res.status).toEqual(400);
                    return done();
                }
                fail();
            });
    });
    it('should reject a new algorithm that might contain malicious code (setTimeout)', done => {
        let item = {
            initializeSimulation: 'setTimeout(function(){console.log()}, 2000)'
        };
        request(app)
            .put(`${basePath}/test/123abc`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    expect(res.status).toEqual(400);
                    return done();
                }
                fail();
            });
    });
    it('should reject a new algorithm that might contain malicious code (Function)', done => {
        let item = {
            initializeSimulation: 'var foo=new Function();'
        };
        request(app)
            .put(`${basePath}/test/123abc`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    expect(res.status).toEqual(400);
                    return done();
                }
                fail();
            });
    });
    it('should reject a new algorithm that might contain malicious code (exec)', done => {
        let item = {
            initializeSimulation: 'exec(hi);'
        };
        request(app)
            .put(`${basePath}/test/123abc`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    expect(res.status).toEqual(400);
                    return done();
                }
                fail();
            });
    });
    it('should delete an algorithms', done => {
        request(app)
            .delete(`${basePath}/test/123abc`)
            .expect(204)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should return a 204 an algorithms doesn\'t exist', done => {
        request(app)
            .get(`${basePath}/test/abc123`)
            .expect(204)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
