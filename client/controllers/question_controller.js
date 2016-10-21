app.controller('questionController',
  ['$scope',
  'questionsFactory',
  '$location',
  'usersFactory',
  function($scope, questionsFactory, $location, usersFactory)
  {
    $scope.sortType = "createdAt";
    $scope.errors = [];
    $scope.questions = [];
    $scope.user = null;

    var index = function()
    {
      questionsFactory.index(function(returnedData)
      {
        $scope.questions = returnedData;
      });
    };

    $scope.create = function()
    {
      $scope.newQuestion.userID = $scope.user._id;
      questionsFactory.create($scope.newQuestion, function(result)
      {
        if(result.errors)
        {
          $scope.errors = result.errors;
        }
        else
        {
          $scope.errors = null;
          $scope.questions = result.questions;
          $location.url('/qa/index');
        }
      });
    };

    $scope.redirect = function(destination)
    {
      $location.url(destination);
    }

    // Logs out the current user.
    $scope.logout = function()
    {
      usersFactory.logout(function(user)
      {
        $scope.user = user;
        $location.url('/qa/login');
      });
    };

    // Check if user is logged in when controller loads.
    // If so, show the index page. If not, redirect to login.
    usersFactory.getLoggedInUser(function(result)
    {
      $scope.user = result.user;
      if(!$scope.user)
        $location.url("/qa/login");
      else
        // Get all our users when the controllers loads
        // after the user is logged in.
        index();
    });
  }]);
