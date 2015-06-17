'use strict';

/**
 * Module dependencies.
 */
var storiesPolicy = require('../policies/stories.server.policy'),
	stories = require('../controllers/stories.server.controller');

module.exports = function(app) {
	// Stories collection routes
	app.route('/api/stories').all(storiesPolicy.isAllowed)
		.get(stories.list)
		.post(stories.create);

	// Single story routes
	app.route('/api/stories/:storyId').all(storiesPolicy.isAllowed)
		.get(stories.read)
		.put(stories.update)
		.delete(stories.delete);

	// Finish by binding the story middleware
	app.param('storyId', stories.storyByID);
};
