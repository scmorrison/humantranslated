'use strict';

(function() {
	// Stories Controller Spec
	describe('StoriesController', function() {
		// Initialize global variables
		var StoriesController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Stories controller.
			StoriesController = $controller('StoriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one story object fetched from XHR', inject(function(Stories) {
			// Create sample story using the Stories service
			var sampleStory = new Stories({
				title: 'An Story about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample stories array that includes the new story
			var sampleStories = [sampleStory];

			// Set GET response
			$httpBackend.expectGET('stories').respond(sampleStories);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stories).toEqualData(sampleStories);
		}));

		it('$scope.findOne() should create an array with one story object fetched from XHR using a storyId URL parameter', inject(function(Stories) {
			// Define a sample story object
			var sampleStory = new Stories({
				title: 'An Story about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.storyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/stories\/([0-9a-fA-F]{24})$/).respond(sampleStory);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.story).toEqualData(sampleStory);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Stories) {
			// Create a sample story object
			var sampleStoryPostData = new Stories({
				title: 'An Story about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample story response
			var sampleStoryResponse = new Stories({
				_id: '525cf20451979dea2c000001',
				title: 'An Story about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Story about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('stories', sampleStoryPostData).respond(sampleStoryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the story was created
			expect($location.path()).toBe('/stories/' + sampleStoryResponse._id);
		}));

		it('$scope.update() should update a valid story', inject(function(Stories) {
			// Define a sample story put data
			var sampleStoryPutData = new Stories({
				_id: '525cf20451979dea2c000001',
				title: 'An Story about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock story in scope
			scope.story = sampleStoryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/stories\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/stories/' + sampleStoryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid storyId and remove the story from the scope', inject(function(Stories) {
			// Create new story object
			var sampleStory = new Stories({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new stories array and include the story
			scope.stories = [sampleStory];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/stories\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStory);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.stories.length).toBe(0);
		}));
	});
}());
