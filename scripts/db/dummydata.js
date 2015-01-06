// Setup dev db with dummy data for testing

var Client = require('node-rest-client').Client;

client = new Client();

// registering remote methods
client.registerMethod("newUser", "http://localhost:3000/api/users", "POST");


var headers = { "Content-Type": "application/json" };

var args_admin = {
  data: {
    username: "admin",
    password: "password"
  },
  headers: headers
};

client.methods.newUser(args_admin, function(data, res){
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(res);
});

var args_user1 = {
  data: {
    username: "user1",
    password: "password"
  },
  headers: headers
};

client.methods.newUser(args_user1, function(data, res){
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(res);
});

var args_user2 = {
  data: {
    username: "user2",
    password: "password"
  },
  headers: headers
};

client.methods.newUser(args_user2, function(data, res){
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(res);
});

// configure basic http auth for every request
var options_auth={user:"admin", password:"password"};

client = new Client(options_auth);
client.registerMethod("newStory", "http://localhost:3000/api/stories", "POST");

var args_story1 = {
  data: {
    title: "Test Story 1",
    category: "culture",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in gravida sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas nisi a eleifend. Duis a sodales neque. Quisque ut maximus nunc. Integer malesuada magna eu nisi ornare maximus. Nam at purus lobortis, blandit magna ut, semper velit. Nulla cursus porta dignissim. Vestibulum sed mauris et ante fringilla scelerisque. Quisque lacus ante, dignissim at lorem ut, ultrices finibus nisl. Integer quis velit elit. Suspendisse elementum lorem semper sem consectetur, in porttitor nunc rutrum. Donec feugiat aliquam arcu, non tristique felis lobortis ac. \
Ut rutrum venenatis nisl ut pulvinar. Morbi euismod, velit eget facilisis posuere, est est facilisis dui, nec maximus orci magna ut mauris. Suspendisse dui nulla, faucibus a ultrices sit amet, facilisis molestie mi. In congue, ex a pellentesque finibus, felis lectus porta quam, dignissim vehicula lorem elit ut augue. Mauris malesuada, mi ut fermentum cursus, leo nisl placerat erat, sit amet posuere enim enim eget massa. Nullam placerat dapibus lorem id lobortis. Pellentesque bibendum feugiat arcu, eget auctor tellus dignissim eget. \
In faucibus lacus turpis, sed ultricies lacus maximus eget. Proin varius lectus nisl, a convallis eros sollicitudin eget. Sed aliquet imperdiet quam, nec faucibus nisi efficitur aliquam. Praesent imperdiet nisi at diam porta, at pretium felis fermentum. In facilisis ligula neque, vel bibendum enim luctus semper. Praesent in ex id nisi faucibus vulputate. Nullam nec fermentum lectus. Aliquam fermentum nisl id ante sollicitudin, sit amet condimentum elit tincidunt. Vestibulum dignissim nibh at dui posuere interdum ut sit amet libero. Nulla ante ipsum, posuere eget lacus eget, elementum dignissim ante. Phasellus id diam porttitor, dapibus augue non, finibus quam. Duis placerat non metus id condimentum. Vestibulum in sagittis ex."
  },
  headers: headers
};

client.methods.newStory(args_story1, function(data, res){
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(res);
});
