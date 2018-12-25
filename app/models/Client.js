const mongoose = require('mongoose');
const validator = require('validator');

let ObjectId = mongoose.Schema.Types.ObjectId;

const clientSchema = mongoose.Schema({
  _id: ObjectId,
  name: {
    type: String,
    trim: true,
    required: [true, "Client name is required"]
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: email => validator.isEmail(email),
      message: props => `${props.value} is not a valid email`,
    }
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
  updatedAt: {
    type:Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Client', clientSchema)
