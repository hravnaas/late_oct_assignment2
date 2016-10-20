// Import required modules.
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var port = 9000;

// Configure Express.
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Setup support for using sessions.
// Stolen with love from https://github.com/expressjs/session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: '$ keyboard cat was here 3399!',
  resave: true, //possible this should be false!!
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Load up the file that handles the database connection.
require("./server/config/mongoose.js");

// Load up the file that handles routing.
var routes_setter = require("./server/config/routes.js");
routes_setter(app);

// Spin up the server on the requested port.
app.listen(port, function() {
    console.log("listening on port " + port);
});
