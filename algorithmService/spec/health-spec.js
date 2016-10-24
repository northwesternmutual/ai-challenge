import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';

const fakeOS = {
    hostname: function () {
        return 'testOS';
    }
};

const app = express();

const route = proxyquire('../routes/health.js', { 'os': fakeOS });

app.use(route);

describe('health', () => {
    it('should return the node server name', done => {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body['Node Host']).toEqual('testOS');
                done();
            });
    });
});


