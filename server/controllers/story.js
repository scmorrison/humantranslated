// Load required packages
var Story = require('../models/story');

// Create endpoint /api/stories for POST
exports.postStories = function(req, res) {
  // Create a new instance of the Story model
  var story = new Story();

  // Set the story properties that came from the POST data
  story.title = req.body.title;
  story.category = req.body.category;
  story.body = req.body.body;
  story.userId = req.user._id;

  // Save the story and check for errors
  story.save(function(err) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    res.json({ message: 'story added', data: story });
  });
};

// Create endpoint /api/stories for GET
exports.getStories = function(req, res) {
  // Use the Story model to find all story
  Story.find({ userId: req.user._id }, function(err, stories) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(stories);
  });
};

// Create endpoint /api/stories/:story_id for GET
exports.getStory = function(req, res) {
  // Use the Story model to find a specific story
  Story.find({ userId: req.user._id, _id: req.params.story_id }, function(err, story) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(story);
  });
};

// Create endpoint /api/stories/:story_id for PUT
exports.putStory = function(req, res) {

  var story = { 
    title: req.body.title, 
    category: req/body.category,
    body: req.body.body 
  };

  // Use the Story model to find a specific story
  Story.update({ userId: req.user._id, _id: req.params.story_id }, story, function(err, num, raw) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/stories/:story_id for DELETE
exports.deleteStory = function(req, res) {
  // Use the Story model to find a specific story and remove it
  Story.remove({ userId: req.user._id, _id: req.params.story_id }, function(err) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ message: 'Story removed.' });
  });
};
