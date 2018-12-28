const mongoose = require('mongoose');

const connectToMongo = async () => {
  mongoose.set('useFindAndModify', false);

  let connected = false;
  let maxReconnect = 20;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  while (!connected && maxReconnect) {
    try {
      mongoose.connect(
        `mongodb://${process.env.MONGO_HOST || '127.0.0.1:27017/madams'}`,
        { useNewUrlParser: true }
      );
      console.log('MongoDB Connected....');
      connected = true;
    } catch (err) {
      console.log('Reconnecting to database in 5 seconds...');
      await sleep(2000);
      maxReconnect -= 1;
    }
  }

  mongoose.Promise = global.Promise;
};

// mongoose
//   .connect(`mongodb://${process.env.MONGO_USERNAME || ''}:${process.env.MONGO_PASSWORD || ''}@${process.env.MONGO_HOST || '127.0.0.1:27017/madams'}`,
//     { useNewUrlParser: true }
//   )

module.exports = connectToMongo;
