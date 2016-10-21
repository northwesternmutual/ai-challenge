const bodyParser = require('body-parser');
const express = require('express');
const code = require('http-response-codes');
const memwatch = require('memwatch-next');
const simulationsRouter = require('./routes/simulationsRoute.js');
const healthRouter = require('./routes/health');
const docRouter = require('./routes/doc');
const log = require('./utils/logger');

const app = express();

//watch for memory leaks
memwatch.on('leak', function(info) {
    console.log(info, 'Memory leak was detected');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    req.log = log.child({
        requestPath: req.url,
        httpVerb: req.method,
        params: req.params
    });
    req.log.info('Request received');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// routers
app.use('/simulation', simulationsRouter);
app.use('/health', healthRouter);
app.use('/doc', docRouter);

app.use(function(req, res, next) {
    const err = new Error('InvalidUri or InvalidHttpVerb');
    err.status = 400;
    next(err);
}, function(err, req, res, next) { // eslint-disable-line no-unused-vars
    console.log(err);
    res.status(err.status || code.HTTP_INTERNAL_SERVER_ERROR).end();
});

module.exports = app;
