var bunyan = require('bunyan');
var path = require('path');
var basePath = '';
var projectName;
basePath = path.dirname(require.main.filename);
try {
    projectName = require(path.join(basePath, 'package.json')).name;
}
catch (e) {
    projectName = 'unknown';
}

console.log(basePath);
var defaultLevel = 'info';
var logConfig;

try {
    logConfig = require(path.join(basePath, 'log-config.json'));
    console.log('Using custom logging config');
}
catch (e) {
    logConfig = {};
    console.log('Using default logging config');
}

var logName = logConfig.name || projectName;
var level = logConfig.level || defaultLevel;
var log = bunyan.createLogger({
    name: logName,
    streams: [{
        level: level,
        stream: process.stdout
    }]
});

// Adding custom level function so you don't have to specify stream outside module.
log.setLevel = function (level) {
    log.levels(0, level);
    log.info('Logging level overridden, logging level set to ' + level);
};
log.info('Created new logger for ' + logName + ' with logging level ' + level);

module.exports = log;
