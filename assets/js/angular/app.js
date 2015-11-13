var app = angular.module('mainApp', [
  'satellizer',
  'ngRoute',
  'file-model',
  'ui.bootstrap',
  'angularMoment',
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
  }).when('/login', {
    templateUrl: '/templates/login.html',
    controller: 'LoginCtrl',
  }).when('/register', {
    templateUrl: '/templates/register.html',
    controller: 'RegisterCtrl',
  });
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);

app.config(['$authProvider', function($authProvider) {

  $authProvider.withCredentials = true;
  $authProvider.tokenRoot = null;
  $authProvider.cordova = false;
  $authProvider.baseUrl = '/';
  $authProvider.loginUrl = '/auth/login';
  $authProvider.signupUrl = '/auth/signup';
  $authProvider.unlinkUrl = '/auth/unlink/';
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'satellizer';
  $authProvider.authHeader = 'Authorization';
  $authProvider.authToken = 'Bearer';
  $authProvider.storageType = 'localStorage';


   $authProvider.github({
      clientId: '0a95ec76cfb9680b5569'
    });

    $authProvider.facebook({
      clientId: '977758255618510',
      url: '/auth/login?type=facebook',
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    });

}]);
