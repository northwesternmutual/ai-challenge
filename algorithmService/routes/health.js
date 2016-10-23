import express from 'express';
import os from 'os';

let router = express.Router();

/* Health check for app. */
router.get('/', function (req, res) {
    return res.json({
        'Node Host': os.hostname()
    });
});

module.exports = router;
