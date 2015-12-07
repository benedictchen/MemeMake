var app = angular.module('mainApp', [
  'ngRoute',
  'file-model',
  'ui.bootstrap',
  'angularMoment',
  'ui-notification',
  'angular-storage',
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
    controller: 'AuthCtrl',
  })
}]);

app.factory('RequestInterceptor', [
  '$rootScope',
  function($rootScope) {
    return {
      responseError: function(response) {
        console.warn(response);
        if (/^\/auth/.test(response.config.url)) {
          return response;
        }
        if (response.status === 401 || response.status === 403) {
          console.log('Unauthorized response detected...');
          $rootScope.$broadcast('unauthorized');
        }
        return response;
      }
    };
  }
]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('RequestInterceptor');
}]);

app.run([
  '$rootScope',
  '$templateRequest',
  '$templateCache',
  '$compile',
  '$uibModal',
  '$q',
  'store',
  function(
    $rootScope,
    $templateRequest,
    $templateCache,
    $compile,
    $uibModal,
    $q,
    store) {

  var modalTimer = null;

  $rootScope.user = store.get('user');

  $rootScope.$on('authorized', function(evt, user) {
    console.warn('ROOT SCOPE USER', user);
    if (user) {
      $rootScope.user = user;
      store.set('user', user);
    }
  });

  $rootScope.$on('unauthorized', function() {

    var showModal = function() {
      return $q(function(resolve, reject) {
        if (modalTimer) {
          clearTimeout(modalTimer);
        }
        modalTimer = setTimeout(function() {
          $uibModal.open({
            animation: true,
            templateUrl: '/templates/login.html',
            controller: 'AuthCtrl'
          });
        }, 500);
      });
    };
    showModal();

  });

}]);
