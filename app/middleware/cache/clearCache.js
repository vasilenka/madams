const { clearHash } = require('../../services/redis-cache');

module.exports = async (req, res, next) => {
  await next();
  clearHash(req.body.id || '');
};
