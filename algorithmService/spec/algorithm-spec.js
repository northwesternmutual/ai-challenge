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
