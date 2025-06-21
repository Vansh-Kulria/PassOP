const mongoose = require('mongoose');

const passOPSchema = new mongoose.Schema({
  website_url: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true,
  },

  id: {
    type: String,
    required: true,
   
    },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PassOP = mongoose.model('PassOP', passOPSchema);
module.exports = PassOP;