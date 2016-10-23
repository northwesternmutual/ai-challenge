'use strict';
var express = require('express');
var os = require('os');

const router = express.Router();

/* Health check for app. */
router.get('/', function (req, res) {
    return res.json({
        'Node Host': os.hostname()
    });
});

module.exports = router;
