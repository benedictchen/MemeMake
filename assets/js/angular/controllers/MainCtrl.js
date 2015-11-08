angular.module('mainApp').controller('MainCtrl', [
  '$scope', 'MemeService', '$http', '$location',
  function($scope, MemeService, $http, $location) {

  // Connect to the socket.
  io.socket.get('/meme/addconv');

  $scope.memes = [];
  $scope.memeTemplates = [];
  $scope.isUploading = false;
  $scope.generatedMeme = null;

  $scope.selectedTemplate = null;

  /**
   * Retrieves the latest list of memes.
   */
  $scope.list = function() {
    MemeService.list().then(function(results) {
      $scope.memes = results;
    });
  };

  $scope.listRecent = function() {
    MemeService.listRecent().then(function(results) {
      $scope.memes = results;
    })
  };

  $scope.listTemplates = function() {
    MemeService.listTemplates().then(function(results) {
      $scope.memeTemplates = results;
    });
  };

  $scope.setSelectedTemplate = function(template) {
    $scope.selectedTemplate = template;
  };

  $scope.clearSelectedTemplate = function() {
    $scope.selectedTemplate = null;
  };

  $scope.isoStrToDate = function(isoString) {
    return Date.parse(isoString);
  };

  $scope.saveMeme = function() {
    if (!$scope.generatedMeme) {
      console.error('No meme.');
      return;
    }
    var description = ($scope.upperRowText  || '') + ' ' +
                      ($scope.middleRowText || '') + ' ' +
                      ($scope.bottomRowText || '');
    if (!description.trim()) {
      return;
    }

    MemeService.saveMeme($scope.generatedMeme, description)
      .then(function() {
        $location.path('/recent');
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
        $scope.templateImageFile = null;
        $scope.templateTitle = null;
      });
    }).catch(function(err) {
      $scope.isUploading = false;
      console.warn('Fail!', arguments);
    });
  };

  $scope.listRecent();
  $scope.listTemplates();

}]);
