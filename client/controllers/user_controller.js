app.controller('userController',
  ['$scope',
  'usersFactory',
  '$location',
  function($scope, usersFactory, $location)
  {
    // The currently logged in user.
    $scope.user = null;

    // Log in the user.
    $scope.login = function()
    {
      usersFactory.login($scope.currentUser, function(result)
      {
        if(result.errors)
        {
          $scope.errors = result.errors;
          $location.url('/qa/login');
        }
        else
        {
          $scope.user = result.user;
          $scope.errors = null;
          $location.url('/qa/index');
        }
      });
    };

    // Logs out the current user.
    $scope.logout = function()
    {
      usersFactory.logout(function(user)
      {
        $scope.user = user;
        $location.url('/qa/login');
      });
    };
  }]);
