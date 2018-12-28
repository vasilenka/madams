const mongoose = require('mongoose');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const connectToMongo = async () => {
  mongoose.set('useFindAndModify', false);

  let connected = false;
  let maxReconnect = 20;

  while (!connected && maxReconnect) {
    try {
      let mongo = await mongoose.connect(
        `mongodb://${process.env.MONGO_USERNAME + ':' || ''}${process.env
          .MONGO_PASSWORD + '@' || ''}${process.env.MONGO_HOST ||
          '127.0.0.1:27017/madams'}`,
        { useNewUrlParser: true }
      );
      if (mongo) {
        console.log('MongoDB Connected....');
        connected = true;
      }
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
