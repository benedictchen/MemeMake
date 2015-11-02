app.controller('MainCtrl', [
  '$scope', 'MemeService', '$http',
  function($scope, MemeService, $http) {

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

  $scope.uploadFile = function() {
    var file = $scope.fileModel;
    console.warn(file)
    // Get the upload URL, then upload the file to S3.
    MemeService.uploadFile(file).then(function() {
      console.warn('SUCCESS!', arguments);
    }).catch(function(err) {
      console.warn('Fail!', arguments);
    });
  };

  $scope.list();


}]);
