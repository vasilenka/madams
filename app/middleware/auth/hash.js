const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = async (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({
      message: 'Please provide a password!'
    });
  }

  req.body.password = await bcrypt.hash(req.body.password, saltRounds);

  next();
};

module.exports = hash;
