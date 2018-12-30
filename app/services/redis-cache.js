const mongoose = require('mongoose');
const client = require('./../database/connect-redis');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = async function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key) || 'default';

  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  let key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  let cachedValue = await client.hget(this.hashKey, key);

  if (cachedValue) {
    const doc = JSON.parse(cachedValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);

  if (result) {
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 60);
  }

  return result;
};

module.exports = {
  async clearHash(key) {
    let hash = key || 'default';
    client.del(JSON.stringify(hash));
  }
};
