'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var swagger = JSON.parse(fs.readFileSync('./swagger.json').toString());

/* Health check for app. */
router.get('/', function (req, res) {
    return res.json(swagger);
});

module.exports = router;
