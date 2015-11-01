app.controller('MainCtrl', ['$scope', 'MemeService', function($scope, MemeService) {

  // Connect to the socket.
  io.socket.get('/meme/addconv');

  $scope.memes = [];

  /**
   * Retrieves the latest list of memes.
   */
  $scope.list = function() {
    MemeService.list().then(function(results) {
      console.log(arguments);
      $scope.memes = results;
    });
  };

  $scope.list();

}]);
