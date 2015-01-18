'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Story = mongoose.model('Story'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, story;

/**
 * Story routes tests
 */
describe('Story CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new story
		user.save(function() {
			story = {
				title: 'Story Title',
				content: 'Story Content'
			};

			done();
		});
	});

	it('should be able to save an story if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new story
				agent.post('/stories')
					.send(story)
					.expect(200)
					.end(function(storySaveErr, storySaveRes) {
						// Handle story save error
						if (storySaveErr) done(storySaveErr);

						// Get a list of stories
						agent.get('/stories')
							.end(function(storiesGetErr, storiesGetRes) {
								// Handle story save error
								if (storiesGetErr) done(storiesGetErr);

								// Get stories list
								var stories = storiesGetRes.body;

								// Set assertions
								(stories[0].user._id).should.equal(userId);
								(stories[0].title).should.match('Story Title');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save an story if not logged in', function(done) {
		agent.post('/stories')
			.send(story)
			.expect(401)
			.end(function(storySaveErr, storySaveRes) {
				// Call the assertion callback
				done(storySaveErr);
			});
	});

	it('should not be able to save an story if no title is provided', function(done) {
		// Invalidate title field
		story.title = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new story
				agent.post('/stories')
					.send(story)
					.expect(400)
					.end(function(storySaveErr, storySaveRes) {
						// Set message assertion
						(storySaveRes.body.message).should.match('Title cannot be blank');
						
						// Handle story save error
						done(storySaveErr);
					});
			});
	});

	it('should be able to update an story if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new story
				agent.post('/stories')
					.send(story)
					.expect(200)
					.end(function(storySaveErr, storySaveRes) {
						// Handle story save error
						if (storySaveErr) done(storySaveErr);

						// Update story title
						story.title = 'WHY YOU GOTTA BE SO MEAN?';

						// Update an existing story
						agent.put('/stories/' + storySaveRes.body._id)
							.send(story)
							.expect(200)
							.end(function(storyUpdateErr, storyUpdateRes) {
								// Handle story update error
								if (storyUpdateErr) done(storyUpdateErr);

								// Set assertions
								(storyUpdateRes.body._id).should.equal(storySaveRes.body._id);
								(storyUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of stories if not signed in', function(done) {
		// Create new story model instance
		var storyObj = new Story(story);

		// Save the story
		storyObj.save(function() {
			// Request stories
			request(app).get('/stories')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single story if not signed in', function(done) {
		// Create new story model instance
		var storyObj = new Story(story);

		// Save the story
		storyObj.save(function() {
			request(app).get('/stories/' + storyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('title', story.title);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should return proper error for single story which doesnt exist, if not signed in', function(done) {
		request(app).get('/stories/test')
			.end(function(req, res) {
				// Set assertion
				res.body.should.be.an.Object.with.property('message', 'Story is invalid');

				// Call the assertion callback
				done();
			});
	});

	it('should be able to delete an story if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new story
				agent.post('/stories')
					.send(story)
					.expect(200)
					.end(function(storySaveErr, storySaveRes) {
						// Handle story save error
						if (storySaveErr) done(storySaveErr);

						// Delete an existing story
						agent.delete('/stories/' + storySaveRes.body._id)
							.send(story)
							.expect(200)
							.end(function(storyDeleteErr, storyDeleteRes) {
								// Handle story error error
								if (storyDeleteErr) done(storyDeleteErr);

								// Set assertions
								(storyDeleteRes.body._id).should.equal(storySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete an story if not signed in', function(done) {
		// Set story user 
		story.user = user;

		// Create new story model instance
		var storyObj = new Story(story);

		// Save the story
		storyObj.save(function() {
			// Try deleting story
			request(app).delete('/stories/' + storyObj._id)
			.expect(401)
			.end(function(storyDeleteErr, storyDeleteRes) {
				// Set message assertion
				(storyDeleteRes.body.message).should.match('User is not logged in');

				// Handle story error error
				done(storyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Story.remove().exec();
		done();
	});
});
