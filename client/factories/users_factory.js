

app.factory('usersFactory', ['$http', function($http)
{
  // The currently logged in user.
  var user = {};

  function UsersFactory()
  {
    var _this = this;

    // Log in an existing user.
    this.login = function(loginUser, callback)
    {
      $http.post('/qa/login', loginUser)
        .then(function(returned_data)
        {
          if(returned_data.data.errors)
          {
            callback({ errors : returned_data.data.errors });
          }
          else
          {
            user = returned_data.data.user;
            if(typeof(callback) == 'function')
            {
              callback({ user : user });
            }
          }
      });
    };

    this.logout = function(callback)
    {
      $http.get("/qa/logout")
        .then(function(returned_data)
        {
          user = returned_data.data.user;
          if(typeof(callback) == 'function')
          {
            callback({ user : user });
          }
      });
    };

    // Check if the user is logged in.
    // If 'user' comes back as null, a user is not logged in.
    this.getLoggedInUser = function(callback)
    {
      $http.get("/qa/getLoggedInUser")
        .then(function(returned_data)
        {
          user = returned_data.data.user;
          if(typeof(callback) == 'function')
          {
            callback({ user : user });
          }
      });
    };
  }

  return new UsersFactory();
}]);
