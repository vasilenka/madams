const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = mongoose.Schema({
  sender: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Message', messageSchema);
