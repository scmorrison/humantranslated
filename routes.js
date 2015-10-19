/**
 * Add your routes here
 */

RouterLayer.route('/', {
	name: 'home',
	template: 'home',
	layout: 'layout'
});

RouterLayer.route('/stories/:_id', {
	name: 'story',
	template: 'story',
	layout: 'layout'
});
