'use strict';

//Stories service used for communicating with the stories REST endpoints
angular.module('stories').factory('Stories', ['$resource',
	function($resource) {
		return $resource('stories/:storyId', {
			storyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
