// Load required packages
var Story = require('../models/story');

// Create endpoint /api/stories for POST
exports.postStories = function(req, res) {
  // Create a new instance of the Story model
  var story = new Story();

  // Set the story properties that came from the POST data
  story.name = req.body.name;
  story.type = req.body.type;
  story.quantity = req.body.quantity;
  story.userId = req.user._id;

  // Save the story and check for errors
  story.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'story added', data: story });
  });
};

// Create endpoint /api/stories for GET
exports.getStories = function(req, res) {
  // Use the Story model to find all story
  Story.find({ userId: req.user._id }, function(err, stories) {
    if (err)
      res.send(err);

    res.json(stories);
  });
};

// Create endpoint /api/stories/:story_id for GET
exports.getStory = function(req, res) {
  // Use the Story model to find a specific story
  Story.find({ userId: req.user._id, _id: req.params.story_id }, function(err, story) {
    if (err)
      res.send(err);

    res.json(story);
  });
};

// Create endpoint /api/stories/:story_id for PUT
exports.putStory = function(req, res) {
  // Use the Story model to find a specific story
  Story.update({ userId: req.user._id, _id: req.params.story_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/stories/:story_id for DELETE
exports.deleteStory = function(req, res) {
  // Use the Story model to find a specific story and remove it
  Story.remove({ userId: req.user._id, _id: req.params.story_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Story removed from the locker!' });
  });
};
