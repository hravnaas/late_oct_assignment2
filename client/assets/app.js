/* our angular app modularize, with config */
var app = angular.module('app', ['ngRoute', 'ngMessages']);

/* configuration for angular route */
app.config(function($routeProvider)
{
  $routeProvider
    .when('/qa/login', {
      templateUrl: '/partials/login.html',
      controller: 'userController',
      controllerAs: 'UC'
    })
    .when('/qa/index', {
      templateUrl: '/partials/index.html',
      controller: 'questionController'
    })
    .when('/qa/question/new', {
      templateUrl: '/partials/new_question.html',
      controller: 'questionController'
    })
    .when('/qa/question/:id/show', {
      templateUrl: '/partials/show_question.html',
      controller: 'answerController'
    })
    .when('/qa/question/:id/answer', {
      templateUrl: '/partials/answer_question.html',
      controller: 'answerController'
    })
    // .when('/qa/:id/delete', {
    //   templateUrl: '/partials/delete.html',
    //   controller: 'editController',
    //   controllerAs: 'EC'
    // })
    // .when('/qa/:id', {
    //   templateUrl: '/partials/show.html',
    //   controller: 'editController',
    //   controllerAs: 'EC'
    // })
    .otherwise({
      redirectTo: '/qa/index'
    });
});
