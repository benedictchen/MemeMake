angular.module('mainApp').controller('MemeDetailCtrl', [
  '$routeParams', '$scope', 'MemeService', '$http', '$location',
  function($routeParams, $scope, MemeService, $http, $location) {

    $scope.memeId = $routeParams.memeId;
    $scope.meme = null;
    $scope.shortcutUrl = $location.absUrl();


    MemeService.getMemeById($scope.memeId).then(function(result) {
      $scope.meme = result;
    });

}]);
