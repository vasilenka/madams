const mongoose = require('mongoose');
const validator = require('validator');

let ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  _id: ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: email => validator.isEmail(email),
      message: props => `${props.value} is not a valid email`,
    }
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    minlength: [8, "Password minimum length is 8 characters"],
    trim: true,
    required: true,
    type: String,
  },
  firstName: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
  updatedAt: {
    type:Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
