app.controller('MainCtrl', [
  '$scope', 'MemeService', '$http',
  function($scope, MemeService, $http) {

  // Connect to the socket.
  io.socket.get('/meme/addconv');

  $scope.memes = [];
  $scope.memeTemplates = [];
  $scope.isUploading = false;

  /**
   * Retrieves the latest list of memes.
   */
  $scope.list = function() {
    MemeService.list().then(function(results) {
      $scope.memes = results;
    });
  };

  $scope.listTemplates = function() {
    MemeService.listTemplates().then(function(results) {
      $scope.memeTemplates = results;
    });
  };

  /**
   * Uploads a new template.
   */
  $scope.uploadTemplate = function() {
    var file = $scope.templateImageFile;
    var title = $scope.templateTitle;
    if (!file || !title) { return; }
    // Get the upload URL, then upload the file to S3.
    $scope.isUploading = true;
    MemeService.uploadFile(file).then(function(url) {
      MemeService.createTemplate(title, url)
      .then(function() {
        $scope.isUploading = false;
        $scope.listTemplates();
      });
    }).catch(function(err) {
      $scope.isUploading = false;
      console.warn('Fail!', arguments);
    });
  };

  $scope.list();
  $scope.listTemplates();

}]);
