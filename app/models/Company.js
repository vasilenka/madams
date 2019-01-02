const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Company', companySchema);
