const redis = require('redis');
const redisUrl = `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env
  .REDIS_PORT || '6379'}`;

const client = redis.createClient(redisUrl);

const util = require('util');
client.hget = util.promisify(client.hget);

module.exports = client;
