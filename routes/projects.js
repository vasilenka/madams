var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "GET request to the /projects"
  });
});

router.post('/', function(req, res, next) {
  res.status(200).json({
    message: "POST request to the /projects"
  });
});

module.exports = router;
