var DEFAULT_CONFIG;
var ENV_CONFIG;

try {
    DEFAULT_CONFIG = require('./config/default.json');
} catch (ex) {
    DEFAULT_CONFIG = {};
}

try {
    ENV_CONFIG = require(`./config/${process.env.NODE_ENV}.json`);
} catch (ex) {
    ENV_CONFIG = {};
}

module.exports = Object.assign({}, DEFAULT_CONFIG, ENV_CONFIG);
