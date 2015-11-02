var app = angular.module('mainApp', [
  'ngRoute', 'file-model'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/templates/index.html',
    controller: 'MainCtrl'
  });
}]);
