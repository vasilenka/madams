const mongoose = require('mongoose');
const client = require('./../database/connect-redis');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = async function() {
  this.useCache = true;
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

  let cachedValue = await client.get(key);

  if (cachedValue) {
    const doc = JSON.parse(cachedValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model({ ...d, from: 'redis' }))
      : new this.model({ ...doc, from: 'redis' });
  }

  const result = await exec.apply(this, arguments);

  if (result) {
    await client.set(key, JSON.stringify(result));
    return result;
  }
};
