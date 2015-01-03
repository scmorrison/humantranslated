// Setup dev db with dummy data for testing

var Client = require('node-rest-client').Client;

client = new Client();

var args = {
  data: {
    username: "admin",
    password: "password"
  },
  headers: { "Content-Type": "application/json" }
};

// Post the new user
client.post("http://localhost:3333/api/users", args, function(data, res) {
  // parsed response body as js object
  console.log(data);
  // raw response
  console.log(res);
});
