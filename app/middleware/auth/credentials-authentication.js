const bcrypt = require('bcrypt');

let User = require('../../models/User');

let authCredentials = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({
      message: 'Please provide an email'
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      message: 'Please provide a password'
    });
  }

  let query = {
    email: req.body.email
  };

  User.findOne(query)
    .then(async user => {
      if (!user) {
        return res.status(401).json({
          message: 'Authentication failed'
        });
      }

      let compareResult = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!compareResult) {
        return res.status(401).json({
          message: 'Authentication failed!'
        });
      }

      return user.isTokenExist();
    })
    .then(user => {
      if (user.tokenExist) {
        return res.status(406).json({
          message: "You're already authenticate!"
        });
      }
      return user.generateAuthToken();
    })
    .then(result => {
      req.body.token = result.token;
      next();
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Authentication failed!',
        error: err
      });
    });
};

module.exports = authCredentials;
