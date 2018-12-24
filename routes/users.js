var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "GET request to the /users"
  });
});

router.post('/', function(req, res, next) {
  let user = {
    username: req.body.username,
    email: req.body.email
  }
  res.status(201).json({
    message: 'POST request to /users',
    user: user
  })
});

router.patch('/:userId', function(req, res, next) {
  res.status(200).json({
    message: 'PATCH request to /users/:id',
    id: req.params.userId,
  })
});

router.delete('/:userId', function(req, res, next) {
  res.status(200).json({
    message: 'DELETE request to /users/:id',
    id: req.params.userId,
  })
});

module.exports = router;
