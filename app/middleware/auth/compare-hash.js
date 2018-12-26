const bcrypt = require('bcrypt');

let User = require('../../models/User');

let compare = (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({
      message: 'Please provide a password'
    });
  }

  let query = { email: req.body.email };

  User.findOne(query)
    .then(async user => {
      let compareResult = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!compareResult) {
        return res.status(401).json({
          message: 'Authentication failed!'
        });
      }
      next();
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Authentication failed!',
        error: err
      });
    });
};

module.exports = compare;
