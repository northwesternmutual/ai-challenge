import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';
import bodyParser from 'body-parser';
import { getMatches } from '../../mock/tournament.js';
import { getMatches as getMatchesError } from '../../mock/errors.js';
import fs from 'fs';
import path from 'path';

let app;
let route;

const basePath = '/matches';

function setupFakeRouter(dependencies) {
    app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    route = proxyquire
        .noCallThru()
        .load('../../routes/matchesRoute.js', {
            '../src/tournament.js': dependencies
        });

    app.use('/matches', route);
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
                expect(res.body).toEqual({ matches: JSON.parse(fs.readFileSync(path.join(__dirname + '/../../mock/data/matches.json')).toString()) });
                done();
            });
    });
    it('should return a 204 an algorithms doesn\'t exist', function (done) {
        setupFakeRouter({ getMatches: getMatchesError });
        request(app)
            .get(`${basePath}/ghi789`)
            .expect(204)
            .end((err, res) => { //eslint-disable-line no-unused-vars
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
