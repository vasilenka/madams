const redis = require('redis');
const redisUrl = 'redis://redis:6379';

const client = redis.createClient(redisUrl);

const util = require('util');
client.get = util.promisify(client.get);

// module.exports = client;
