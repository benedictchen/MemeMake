var app = angular.module('mainApp', [
  'ngRoute', 'file-model', 'ui.bootstrap', 'angularMoment'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/templates/recent.html',
    controller: 'MainCtrl'
  }).when('/create', {
    templateUrl: '/templates/create.html',
    controller: 'MainCtrl'
  }).when('/recent', {
    templateUrl: '/templates/recent.html',
    controller: 'MainCtrl'
  }).when('/popular', {
    templateUrl: '/templates/popular.html',
    controller: 'MainCtrl'
  }).when('/leaderboard', {
    templateUrl: '/templates/leaderboard.html',
    controller: 'MainCtrl'
  }).when('/profile', {
    templateUrl: '/templates/profile.html',
    controller: 'MainCtrl'
  }).when('/meme/:memeId', {
    templateUrl: '/templates/show.html',
    controller: 'MemeDetailCtrl'
  });
}]);
