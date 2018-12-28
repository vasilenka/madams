const mongoose = require('mongoose');

const mongoUrl = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME ||
  ''}:${process.env.MONGO_INITDB_ROOT_PASSWORD || ''}@${process.env
  .MONGO_HOST || '127.0.0.1:27017/madams'}`;
mongoose.set('useFindAndModify', false);
mongoose
  .connect(
    mongoUrl,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;
