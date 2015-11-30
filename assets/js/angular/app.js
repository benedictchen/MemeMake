var app = angular.module('mainApp', [
  'ngRoute', 'file-model', 'ui.bootstrap', 'angularMoment', 'ui-notification'
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

app.factory('RequestInterceptor', [
  '$rootScope',
  function($rootScope) {
    return {
      responseError: function(response) {
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
  '$compile', function($rootScope, $templateRequest, $templateCache, $compile) {

  var modalTimer = null;

  $rootScope.$on('unauthorized', function() {

    var showModal = function(template) {
      if (modalTimer) {
        clearTimeout(modalTimer);
      }
      var compiledTemplate = $compile(template)($rootScope);
      modalTimer = setTimeout(function() {
        $(compiledTemplate).modal({
          keyboard: true,
          show: true,
          backdrop: false
        });
      }, 500);
    };

    // Show login modal.
    var template = $templateCache.get('/templates/login.html');
    if (!template) {
      $templateRequest('/templates/login.html').then(function(loginTemplate) {
        $templateCache.put('/templates/login.html', loginTemplate);
        showModal(loginTemplate);
      });
    } else {
      showModal(template);
    }
  });

}]);
