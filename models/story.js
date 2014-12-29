// Load required packages
var mongoose = require('mongoose');

// Story schema
var StorySchema   = new mongoose.Schema({
  name: String,
  category: String,
  body: String,
  created: Date,
  modified: Date,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Story', StorySchema);
