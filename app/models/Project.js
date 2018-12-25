const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = mongoose.Schema({
  _id: ObjectId,
  name: {
    type: String,
    required: true,
  },
  teams: {
    type: [ObjectId],
    ref: 'User'
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  tags: {
    type: [String],
    trim: true,
    lowercase: true,
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

module.exports = mongoose.model('Project', projectSchema);

