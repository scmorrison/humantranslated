Template.story.helpers({
	story: function() {
		return Stories.findOne(Router.current().params._id);
	}
});

Template.story.onRendered(function() {
	this.subscribe('oneStoryWithUser', Router.current().params._id);
});
