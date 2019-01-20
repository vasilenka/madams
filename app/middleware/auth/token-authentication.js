const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

let User = require('../../models/User');

let authenticate = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(400).json({
      message: 'Authorization token is not available',
    });
  }

  let token = req
    .header('Authorization')
    .trim()
    .split(' ')[1];
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.currentUser = user;
      req.token = token;
      next();
    })
    .catch(err => {
      return res.status(401).json({
        message: 'I am a teapot! 🍵',
        error: err
      });
    });
};

module.exports = authenticate;
