const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = mongoose.Schema({
  // _id: ObjectId,
  from: {
    type: String,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  teams: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  tags: [
    {
      type: String,
      trim: true,
      lowercase: true
    }
  ],
  status: {
    type: String,
    enum: [
      'lead',
      'proposal',
      'canceled',
      'development',
      'hold',
      'done',
      'dropped'
    ],
    default: 'lead',
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
