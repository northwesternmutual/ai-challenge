import bodyParser from 'body-parser';
import express from 'express';
import code from 'http-response-codes';
import memwatch from 'memwatch-next';
import playRouter from './routes/playRoute';
import tournamentsRouter from './routes/tournamentsRoute';
import matchesRouter from './routes/matchesRoute';
import healthRouter from './routes/health';
import docRouter from './routes/doc';
import log from './utils/logger';

const app = express();


console.log(process.cwd());

//watch for memory leaks
/* istanbul ignore next */
memwatch.on('leak', info => log.warn(info, 'Memory leak was detected'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    req.log = log.child({
        requestPath: req.url,
        httpVerb: req.method,
        params: req.params,
        headers: req.headers
    });
    req.log.info('Request received');
    next();
});

// routers
app.use('/matches', matchesRouter);
app.use('/play', playRouter);
app.use('/tournament', tournamentsRouter);
app.use('/health', healthRouter);
app.use('/doc', docRouter);

app.use((req, res, next) => {
    const err = new Error('InvalidUri or InvalidHttpVerb');
    err.status = 400;
    next(err);
}, (err, req, res, next) => { // eslint-disable-line no-unused-vars
    req.log.error(err);
    res.status(err.status || code.HTTP_INTERNAL_SERVER_ERROR).end();
});

module.exports = app;

