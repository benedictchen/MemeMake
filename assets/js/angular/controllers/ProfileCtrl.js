angular.module('mainApp').controller('ProfileCtrl', [
  '$routeParams', '$scope', 'MemeService', '$http', '$location',
  function($routeParams, $scope, MemeService, $http, $location) {

    $scope.memes = [];

    $scope.$on('authorized', function(evt, user) {
      $scope.list();
    });

    $scope.list = function() {
      return MemeService.getMemesForUser().then(function(result) {
        $scope.memes = result;
      });
    };

    $scope.list();

}]);
