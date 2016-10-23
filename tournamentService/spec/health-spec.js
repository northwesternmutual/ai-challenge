'use strict';
var request = require('supertest');
var proxyquire = require('proxyquire');
var express = require('express');
var fakeOS = {
    hostname: function () {
        return 'testOS';
    }
};

var app = express();

var route = proxyquire('../routes/health.js', { 'os': fakeOS });
app.use(route);

describe('health', function () {
    it('should return the node server name', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body['Node Host']).toEqual('testOS');
                done();
            });
    });
});
