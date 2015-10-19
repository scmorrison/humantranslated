Template.home.onRendered(function() {
	this.subscribe('storiesWithUsers')
});

Template.home.helpers({
	stories: function () {
		return Stories.find({}, { sort: { createdAt: -1 } });
	}
});
