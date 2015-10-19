/**
 * We will create a new role that will allow
 * not-admin users to edit stories
 */
CommunityRole = new Roles.Role('community');

/**
 * We will allow users to edit the dictionary
 */
CommunityRole.allow('dictionary.update', true);

/**
 * This will make users only can edit this fields in the dictionary
 */
CommunityRole.helper('dictionary.allowedCategories', ['public']);

/**
 * Users can see stories in the admin
 */
CommunityRole.allow('collections.stories.index', true);

/**
 * And we will make that the users only see their stories in the index
 */
CommunityRole.helper('collections.stories.indexFilter', function() {
  return { createdBy: this.userId };
})

/**
 * Users can create stories
 */
CommunityRole.allow('collections.stories.insert', true);

/**
 * Users can update stories
 */
CommunityRole.allow('collections.stories.update', function(userId, doc, fields, modifier) {
  return doc.createdBy === userId; // Will be allowed to edit his own stories
});

/**
 * Users can't change the createdBy attribute
 */
CommunityRole.deny('collections.stories.update', function(userId, doc, fields, modifier) {
  return !_.contains(fields, 'userId');
});

/**
 * Users can remove stories
 */
CommunityRole.allow('collections.stories.remove', function(userId, doc) {
  return doc.createdBy === userId; // Will be allowed to edit his own stories
});

/**
 * Users can see the create story button
 */
CommunityRole.allow('collections.stories.showCreate', true);

/**
 * Users can see the update story button if they created the doc
 */
CommunityRole.allow('collections.stories.showUpdate', function(doc) {
  return doc.createdBy == this.userId;
});

/**
 * Users can see the delete story button if they created the doc
 */
CommunityRole.allow('collections.stories.showRemove', function(doc) {
  return doc.createdBy == this.userId;
});

