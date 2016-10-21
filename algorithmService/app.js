import bodyParser from 'body-parser';
import express from 'express';
import code from 'http-response-codes';
import memwatch from 'memwatch-next';
import algorithmRouter from './routes/algorithmRoutes';
import algorithmsRouter from './routes/algorithmsRoutes';
import healthRouter from './routes/health';
import docRouter from './routes/doc';
import log from './utils/logger';

const app = express();

//watch for memory leaks
memwatch.on('leak', info => log.warn(info, 'Memory leak was detected'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// routers
app.use('/algorithm', algorithmRouter);
app.use('/algorithms', algorithmsRouter);
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

export default app;
