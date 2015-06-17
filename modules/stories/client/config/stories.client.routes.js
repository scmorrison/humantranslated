'use strict';

// Setting up route
angular.module('stories').config(['$stateProvider',
	function($stateProvider) {
		// Stories state routing
		$stateProvider.
		state('stories', {
			abstract: true,
			url: '/stories',
			template: '<ui-view/>'
		}).
		state('stories.list', {
			url: '',
			templateUrl: 'modules/stories/views/list-stories.client.view.html'
		}).
		state('stories.create', {
			url: '/create',
			templateUrl: 'modules/stories/views/create-story.client.view.html'
		}).
		state('stories.view', {
			url: '/:storyId',
			templateUrl: 'modules/stories/views/view-story.client.view.html'
		}).
		state('stories.edit', {
			url: '/:storyId/edit',
			templateUrl: 'modules/stories/views/edit-story.client.view.html'
		});
	}
]);
