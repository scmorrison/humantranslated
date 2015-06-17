'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Words Schema
 */
var Words = new Schema({
  original: String,
  furigana: String
});

/**
 * Story Schema
 */
var StorySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  wordcount: Number,
  words: [Words]
});

mongoose.model('Story', StorySchema);
