let User = require('../../models/User');

const isEmailExist = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({
      message: 'Please provide an email'
    });
  }

  let query = { email: req.body.email };
  let user = await User.findOne(query);

  if (user) {
    req.body.emailExist = true;
  } else {
    req.body.emailExist = false;
  }

  next();
};

module.exports = isEmailExist;
