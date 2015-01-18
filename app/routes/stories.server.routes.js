'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	stories = require('../../app/controllers/stories.server.controller');

module.exports = function(app) {
	// Story Routes
	app.route('/stories')
		.get(stories.list)
		.post(users.requiresLogin, stories.create);

	app.route('/stories/:storyId')
		.get(stories.read)
		.put(users.requiresLogin, stories.hasAuthorization, stories.update)
		.delete(users.requiresLogin, stories.hasAuthorization, stories.delete);

	// Finish by binding the story middleware
	app.param('storyId', stories.storyByID);
};
