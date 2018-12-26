const express = require('express');
const mongoose = require('mongoose');
const pick = require('lodash.pick');

const tokenAuth = require('../middleware/auth/token-authentication');
const checkEmail = require('../middleware/auth/check-email');
const hash = require('../middleware/auth/hash');
const credentialsAuth = require('../middleware/auth/credentials-authentication');

let router = express.Router();

let User = require('./../models/User');

router.post('/login', credentialsAuth, async (req, res, next) => {
  if (!req.body.token) {
    return res.status(401).json({
      message: 'Authentication failed!'
    });
  }
  res
    .status(200)
    .header('Authorization', req.body.token)
    .json({
      message: 'Authentication succeed!'
    });
});

router.post('/logout', tokenAuth, (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Can't handle request"
    });
  }

  req.user
    .removeToken(req.token)
    .then(user => {
      res.status(200).json({
        message: 'Yeay! Deleted...',
        user: user
      });
    })
    .catch(err => {
      res.status(401).json({
        message: "Can't handle request",
        error: err
      });
    });
});

module.exports = router;
