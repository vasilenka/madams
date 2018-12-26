// const bcrypt = require('bcrypt');

// let User = require('./../models/User');

let authenticate = (req, res, next) => {
  console.log('Request Body: ', req.body);
  next();
};

module.exports = authenticate;
