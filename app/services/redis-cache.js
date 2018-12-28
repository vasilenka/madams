const mongoose = require('mongoose');
const client = require('./../database/connect-redis');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function() {
  let query = this;
  let key = JSON.stringify(
    Object.assign({}, query.getQuery(), {
      collection: query.mongooseCollection.name
    })
  );

  let cachedValue = await client.get(key);

  if (cachedValue) {
    const doc = JSON.parse(cachedValue);

    return Array.isArray(doc)
      ? doc.map(data => {
          return new query.model({ data });
        })
      : new query.model(doc);
  }

  const result = await exec.apply(query, arguments);

  if (result) {
    client.set(key, JSON.stringify(result));
    return result;
  }
};
