import request from 'supertest';
import express from 'express';
import fs from 'fs';
import docRoute from '../routes/doc';
import path from 'path';

const app = express();

app.use(docRoute);

describe('doc', () => {
    it('should return the swagger document for this service', done => {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var swagger = fs.readFileSync(path.join(__dirname + '/../swagger.json')).toString();
                expect(res.body).toEqual(JSON.parse(swagger));
                done();
            });
    });
});