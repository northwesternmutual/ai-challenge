import app from './app.js';
import config from './utils/config.js';
import https from 'https';
import http from 'http';
import log from './utils/logger';

const httpListenerPort  = process.env.PORT || config.httpPort || 80;
const httpsListenerPort = process.env.PORT || config.httpsPort || 443;

const OPTIONS = {};

const httpServer = http.createServer(app).listen(httpListenerPort, () => {
    log.info(`app is listening at localhost: ${httpListenerPort}`);
});

const httpsServer = https.createServer(OPTIONS, app).listen(httpsListenerPort, () => {
    log.info(`app is listening at localhost: ${httpsListenerPort}`);
});

process.on('SIGTERM', () => {
    httpServer.close(() => {
        log.info('SIGTERM issued...app is shutting down');
        process.exit(0);
    });
    httpsServer.close(() => {
        log.info('SIGTERM issued...app is shutting down');
        process.exit(0);
    });
});

process.on('SIGUSR2', () => {
    httpServer.close(() => {
        log.info('SIGUSR2 issued...app is shutting down');
        process.exit(0);
    });
    httpsServer.close(() => {
        log.info('SIGUSR2 issued...app is shutting down');
        process.exit(0);
    });
});
