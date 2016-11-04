var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var swagger = JSON.parse(fs.readFileSync(path.join(__dirname + '/../swagger.json')).toString());

/* Health check for app. */
router.get('/', function (req, res) {
    return res.json(swagger);
});

module.exports = router;
