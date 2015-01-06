// Load required packages
var mongoose = require('mongoose');

// Story schema
var StorySchema = new mongoose.Schema({
  title: String,
  category: String,
  body: String,
  created: Date,
  modified: { type: Date, default: Date.now },
  userId: String
});

StorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

// Export the Mongoose model
module.exports = mongoose.model('Story', StorySchema);
