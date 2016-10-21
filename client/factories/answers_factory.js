

app.factory('answersFactory', ['$http', function($http)
{
  var answers = [];
  var answer = {};

  function AnswersFactory()
  {
    // Add a new answer.
    this.create = function(newAnswer, callback)
    {
      $http.post('/qa/answer/' + newAnswer.questionID, newAnswer)
        .then(function(returned_data)
        {
          if(typeof(callback) == 'function')
          {
            callback(returned_data);
          }
      });
    };

    // Add a new like.
    this.like = function(answer, callback)
    {
      $http.get('/qa/answer/' + answer._id)
        .then(function(returned_data)
        {
          if(typeof(callback) == 'function')
          {
            callback(returned_data);
          }
      });
    };
  }

  return new AnswersFactory();
}]);
