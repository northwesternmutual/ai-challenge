// import request from 'supertest';
// import proxyquire from 'proxyquire';
// import express from 'express';
// import bodyParser from 'body-parser';
// import mockRequest from '../../mock/request';
// import { goodQuery, badQueryTwo, invalidQuery } from '../../mock/query';
// import qs from 'qs';
//
// const basePath = '/simulation';
// let app = express();
//
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
// let simulatorMock = proxyquire
//     .noCallThru()
//     .load('../../src/simulator.js', {
//         'request': mockRequest
//     });
//
// let route = proxyquire
//     .noCallThru()
//     .load('../../routes/simulationsRoute.js', {
//         '../src/simulator': simulatorMock
//     });
//
// app.use('/simulation', route);
//
// describe('tournament route', () => {
//     it('should return the results of the simulation', done => {
//         request(app)
//             .get(`${basePath}?${qs.stringify(goodQuery)}`)
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 expect(res.body.playerOne.name).toEqual('frank greco jr');
//                 expect(res.body.playerTwo.name).toEqual('frank greco jr');
//                 expect(res.body.playerOne.id).toEqual('123abc');
//                 expect(res.body.playerTwo.id).toEqual('456def');
//                 expect(res.body.playerOne.wins).toEqual(jasmine.any(Number));
//                 expect(res.body.playerOne.losses).toEqual(jasmine.any(Number));
//                 expect(res.body.playerOne.accuracy).toBeLessThan(1);
//                 expect(res.body.playerTwo.wins).toEqual(jasmine.any(Number));
//                 expect(res.body.playerTwo.losses).toEqual(jasmine.any(Number));
//                 expect(res.body.playerTwo.accuracy).toBeLessThan(1);
//                 done();
//             });
//     });
//
//     it('should throw a 204 if the collection doesn\'t exist', done => {
//         request(app)
//             .get(`${basePath}?${qs.stringify(badQueryTwo)}`)
//             .expect(204)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 expect(res.status).toBe(204);
//                 done();
//             });
//     });
//
//     it('should throw a 400 if the input isn\'t valid', done => {
//         request(app)
//             .get(`${basePath}?${qs.stringify(invalidQuery)}`)
//             .expect(400)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 expect(res.status).toBe(400);
//                 done();
//             });
//     });
// });
