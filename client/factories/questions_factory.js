

app.factory('questionsFactory', ['$http', function($http)
{
  var questions = [];
  var question = {};

  function QuestionsFactory()
  {
    var _this = this;

    // Get all the questions.
    this.index = function(callback)
    {
      $http.get('/qa/question')
        .then(function(returned_data)
        {
          questions = returned_data.data.questions;
          callback(questions);
        });
    };

    // Get one question.
    this.getQuestion = function(questionID, callback)
    {
      $http.get('/qa/question/' + questionID)
        .then(function(returned_data)
        {
          question = returned_data.data.question;
          callback(question);
        });
    };

    // Add a new question.
    this.create = function(newQuestion, callback)
    {
      $http.post('/qa/question', newQuestion)
        .then(function(returned_data)
        {
          if(returned_data.data.errors)
          {
            callback({ errors : returned_data.data.errors });
          }
          else
          {
            question = returned_data.data.question;
            if(typeof(callback) == 'function')
            {
              callback({ question : question });
            }
          }
      });
    };
  }

  return new QuestionsFactory();
}]);
