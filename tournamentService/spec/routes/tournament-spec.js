import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';
import bodyParser from 'body-parser';
import { data, Mongo } from '../../mock/mongo.js';

const app = express();
const basePath = '/tournament';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const route = proxyquire
    .noCallThru().load('../../routes/tournamentsRoute.js', {
        '../controllers/mongo.js': Mongo
    });

app.use('/tournament', route);

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
    it('should return a 204 an algorithms doesn\'t exist', done => {
        request(app)
            .get(`${basePath}/ghi789`)
            .expect(204)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
