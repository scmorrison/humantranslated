/**
 * Publish all stories
 */
Meteor.publish('stories', function () {
  return Stories.find({}, { sort: { createdAt: -1 }, limit: 30 });
});

/**
 * Publish stories with all the creators profiles
 */
Meteor.publishComposite('storiesWithUsers', {
  find: function() {
    return Stories.find({}, { sort: { createdAt: -1 }, limit: 30 });
  },
  children: [{
    find: function(story) {
      return Meteor.users.find({ _id: story.createdBy }, { fields: { profile: 1 } });
    }
  }]
})

/**
 * Publish one story specifically with its creator profile
 */
Meteor.publishComposite('oneStoryWithUser', function(storyId) {
  check(storyId, String);
  return {
    find: function() {
      return Stories.find({ _id: storyId });
    },
    children: [{
      find: function(story) {
        return Meteor.users.find({ _id: story.createdBy }, { fields: { profile: 1 } });
      }
    }]
  }
})
