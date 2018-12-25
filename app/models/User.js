const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  _id: ObjectId,
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('User', userSchema);
