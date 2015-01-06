// Load required packages
var express = require('express');
var helmet = require('helmet');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var storyController = require('./controllers/story');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');

// Connect to the humantranslated MongoDB
mongoose.connect('mongodb://localhost:27017/humantranslated');

// Create our Express application
var app = express();

// Implement CSP with Helmet
app.use(helmet.csp({
  defaultSrc: ["'self'"],
  scriptSrc: ['*.google-analytics.com'],
  styleSrc: ["'unsafe-inline'"],
  imgSrc: ['*.google-analytics.com'],
  connectSrc: ["'none'"],
  fontSrc: [],
  objectSrc: [],
  mediaSrc: [],
  frameSrc: []
}));

// Implement X-XSS-Protection
app.use(helmet.xssFilter());

// Implement X-Frame: Deny
app.use(helmet.xframe());

// Implement X-Frame: SameOrigin
app.use(helmet.xframe('sameorigin'));

// Implement X-Frame: Allow-From
//app.use(helmet.xframe('allow-from', 'http://humantranslated.com'));

// Implement Strict-Transport-Security
app.use(helmet.hsts({
  maxAge: 7776000000,
  includeSubdomains: true
}));

// Hide X-Powered-By
app.use(helmet.hidePoweredBy());

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser json
app.use(bodyParser.json({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({ 
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /stories
router.route('/api/stories')
  .post(authController.isAuthenticated, storyController.postStories)
  .get(authController.isAuthenticated, storyController.getStories);

// Create endpoint handlers for /stories/:story_id
router.route('/api/stories/:story_id')
  .get(authController.isAuthenticated, storyController.getStory)
  .put(authController.isAuthenticated, storyController.putStory)
  .delete(authController.isAuthenticated, storyController.deleteStory);

// Create endpoint handlers for /users
router.route('/api/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /clients
router.route('/api/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/api/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/api/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all our routes
app.use(router);

// Start the server
var server = app.listen(process.env.PORT||3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);

});
