const redis = require('redis');
const redisUrl = `redis://${process.env.REDIS_HOST || '127.0.0.1'}:6379`;

const client = redis.createClient(redisUrl);

const util = require('util');
client.get = util.promisify(client.get);

module.exports = client;
