
// Import requirements.
var mongoose = require("mongoose");
var questions = require("../controllers/questions.js");
var answers = require("../controllers/answers.js");
var users = require("../controllers/users.js");

// Handle incoming route requests.
module.exports = function(app)
{
  ////////// Login & Registration - start //////////

  app.post('/qa/login', function(req, res)
  {
    users.login(req, res);
  });

  app.get('/qa/logout', function(req, res)
  {
    users.logout(req, res);
  });

  app.get('/qa/getLoggedInUser', function(req, res)
  {
    users.getLoggedInUser(req, res);
  });

  ////////// Login & Registration - end //////////


  ////////// Questions //////////

  // Get all questions.
  app.get('/qa/question', function(req, res)
  {
    questions.index(req, res);
  });

  // Add a new question.
  app.post('/qa/question', function(req, res)
  {
    questions.create(req, res);
  });

  // Get the requested question.
  app.get('/qa/question/:id', function(req, res)
  {
    questions.getQuestion(req, res);
  });

  ////////// Answers //////////

  // Add a new answer.
  app.post('/qa/answer/:id', function(req, res)
  {
    answers.create(req, res);
  });
}
