app.controller('answerController',
  ['$scope',
  'answersFactory',
  '$routeParams',
  '$location',
  'usersFactory',
  'questionsFactory',
  function($scope, answersFactory, $routeParams, $location, usersFactory, questionsFactory)
  {
    $scope.questionID = $routeParams.id;
    $scope.question = {};

    $scope.show = function()
    {
      questionsFactory.getQuestion($scope.questionID, function(returnedData)
      {
       $scope.question = returnedData;
      });
    };

    $scope.create = function()
    {
      $scope.newAnswer.questionID = $scope.questionID;
      $scope.newAnswer.userID = $scope.user._id;
      answersFactory.create($scope.newAnswer, function(result)
      {
        if(result.errors)
        {
          $scope.errors = result.errors;
        }
        else
        {
          $scope.errors = null;
          $location.url('/qa/index');
        }
      });
    };

    $scope.like = function(answer)
    {
      answersFactory.like(answer, function(returnedData){
        $scope.show();
      })
    };

    $scope.redirect = function(destination)
    {
      $location.url(destination);
    };

    // Check if user is logged in when controller loads.
    // If so, show the question and answers page. If not, redirect to login.
    usersFactory.getLoggedInUser(function(result)
    {
      $scope.user = result.user;
      if(!$scope.user)
        $location.url("/qa/login");
      else
        $scope.show();
    });
}]);
