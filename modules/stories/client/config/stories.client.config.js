'use strict';

// Configuring the Stories module
angular.module('stories').run(['Menus',
	function(Menus) {
		// Add the stories dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Stories',
			state: 'stories',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'stories', {
			title: 'List Stories',
			state: 'stories.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'stories', {
			title: 'Create Stories',
			state: 'stories.create'
		});
	}
]);
