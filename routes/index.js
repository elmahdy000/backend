var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.json({
    name: 'smart-accounting-backend',
    version: '1.0.0',
    status: 'ok'
  });
});

module.exports = router;
