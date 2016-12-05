import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';
import bodyParser from 'body-parser';
import { data, Mongo } from '../mock/mongo.js';

const app = express();
const basePath = '/algorithms';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const route = proxyquire
    .noCallThru().load('../routes/algorithmsRoutes.js', {
        '../controllers/mongo.js': Mongo
    });

app.use('/algorithms', route);

describe('algorithms route', () => {
    it('should return all algorithms', done => {
        request(app)
            .get(`${basePath}/test`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    fail();
                }
                expect(res.body).toEqual(data.items);
                done();
            });
    });
    it('should create a new algorithm', done => {
        let item = {
            _id: '012jkl',
            email: 'frankgreco@northwesternmutual.com',
            name: 'frank greco jr',
            initializeSimulation: 'this is my function body',
            initializeGame: 'this is my function body',
            startGame: 'this is my function body',
            shoot: 'this is my function body',
            endGame: 'this is my function body',
            date: Date.now()
        };
        request(app)
            .post(`${basePath}/test`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    fail();
                }
                expect(res.body).toEqual(item)
                done();
            });
    });
    it('should reject a new algorithm that might contain malicious code (eval)', done => {
        let item = {
            _id: '345mno',
            email: 'frankgreco@northwesternmutual.com',
            name: 'frank greco jr',
            initializeSimulation: 'eval(this is my function body)',
            initializeGame: 'this is my function body',
            startGame: 'this is my function body',
            shoot: 'this is my function body',
            endGame: 'this is my function body',
            date: Date.now()
        };
        request(app)
            .post(`${basePath}/test`)
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
    it('should reject a new algorithm that might contain malicious code (require)', done => {
        let item = {
            _id: '345mno',
            email: 'frankgreco@northwesternmutual.com',
            name: 'frank greco jr',
            initializeSimulation: 'this is my function body',
            initializeGame: 'var foo=require("module-name");',
            startGame: 'this is my function body',
            shoot: 'this is my function body',
            endGame: 'this is my function body',
            date: Date.now()
        };
        request(app)
            .post(`${basePath}/test`)
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
            _id: '345mno',
            email: 'frankgreco@northwesternmutual.com',
            name: 'frank greco jr',
            initializeSimulation: 'this is my function body',
            initializeGame: 'this is my function body',
            startGame: 'setTimeout(function(){console.log()}, 2000)',
            shoot: 'this is my function body',
            endGame: 'this is my function body',
            date: Date.now()
        };
        request(app)
            .post(`${basePath}/test`)
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
    it('should reject a new algorithm that might contain malicious code (setInterval)', done => {
        let item = {
            _id: '345mno',
            email: 'frankgreco@northwesternmutual.com',
            name: 'frank greco jr',
            initializeSimulation: 'this is my function body',
            initializeGame: 'this is my function body',
            startGame: 'setInterval(function(){console.log()}, 2000)',
            shoot: 'this is my function body',
            endGame: 'this is my function body',
            date: Date.now()
        };
        request(app)
            .post(`${basePath}/test`)
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
            _id: '345mno',
            email: 'frankgreco@northwesternmutual.com',
            name: 'frank greco jr',
            initializeSimulation: 'this is my function body',
            initializeGame: 'this is my function body',
            startGame: 'var foo=new Function();',
            shoot: 'this is my function body',
            endGame: 'this is my function body',
            date: Date.now()
        };
        request(app)
            .post(`${basePath}/test`)
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
            _id: '345mno',
            email: 'frankgreco@northwesternmutual.com',
            name: 'frank greco jr',
            initializeSimulation: 'this is my function body',
            initializeGame: 'this is my function body',
            startGame: 'var foo=eval()',
            shoot: 'this is my function body',
            endGame: 'this is my function body',
            date: Date.now()
        };
        request(app)
            .post(`${basePath}/test`)
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
    it('should delete all algorithms', done => {
        request(app)
            .delete(`${basePath}/test`)
            .expect(204)
            .end((err) => {
                if (err) {
                    fail();
                }
                done();
            });
    });
    it('should return a 204 if no algorithms exist', done => {
        request(app)
            .get(`${basePath}/test`)
            .expect(204)
            .end((err) => {
                if (err) {
                    fail();
                }
                done();
            });
    });
});
