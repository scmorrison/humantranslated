'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Story = mongoose.model('Story'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a story
 */
exports.create = function(req, res) {
	var story = new Story(req.body);
	story.user = req.user;

	story.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(story);
		}
	});
};

/**
 * Show the current story
 */
exports.read = function(req, res) {
	res.json(req.story);
};

/**
 * Update a story
 */
exports.update = function(req, res) {
	var story = req.story;

	story.title = req.body.title;
	story.content = req.body.content;

	story.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(story);
		}
	});
};

/**
 * Delete an story
 */
exports.delete = function(req, res) {
	var story = req.story;

	story.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(story);
		}
	});
};

/**
 * List of Storys
 */
exports.list = function(req, res) {
	Story.find().sort('-created').populate('user', 'displayName').exec(function(err, stories) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stories);
		}
	});
};

/**
 * Story middleware
 */
exports.storyByID = function(req, res, next, id) {
	Story.findById(id).populate('user', 'displayName').exec(function(err, story) {
		if (err) return next(err);
		if (!story) return next(new Error('Failed to load story ' + id));
		req.story = story;
		next();
	});
};
