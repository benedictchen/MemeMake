angular.module('mainApp').controller('MainCtrl', [
  '$scope',
  '$rootScope',
  'MemeService',
  '$http',
  '$location',
  'Notification',
  'VotingService',
  'store',
  function(
    $scope,
    $rootScope,
    MemeService,
    $http,
    $location,
    Notification,
    VotingService,
    store) {

  // Connect to the socket.
  io.socket.get('/meme/addconv');

  $scope.memes = [];
  $scope.votesByMemeId = {};
  $scope.memeTemplates = [];
  $scope.isUploading = false;
  $scope.generatedMeme = null;

  $scope.selectedTemplate = null;

  $scope.hasVote = function(memeId, direction) {
    var userId = $scope.votesByMemeId[memeId] &&
                 $scope.votesByMemeId[memeId].userId;
    return $scope.votesByMemeId[memeId] &&
           $rootScope.user && $rootScope.user.id == userId &&
           $scope.votesByMemeId[memeId].directionValue == direction;
  };

  /**
   * Retrieves the latest list of memes.
   */
  $scope.list = function() {
    MemeService.list().then(function(results) {
      $scope.memes = results;
    });
    $scope.listVotes();
  };

  $scope.listVotes = function() {
    VotingService.list().then(function(results) {
      console.log('Votes:', results);
      results.forEach(function(vote) {
        $scope.votesByMemeId[vote.memeId] = vote;
      });
    });
  };

  $scope.listRecent = function() {
    MemeService.listRecent().then(function(results) {
      $scope.memes = results;
    });
    $scope.listVotes();
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

  $scope.upvote = function(memeId) {
    console.log(memeId);
    VotingService.vote(memeId, 1).then(function(response) {
      console.log('response was', response);
      console.log('User?', $rootScope.user);
      console.log('votesByMemeId', $scope.votesByMemeId);
      $scope.votesByMemeId[response.memeId] = response;
      $scope.list();
    });
  };

  $scope.downvote = function(memeId) {
    console.log(memeId);
    VotingService.vote(memeId, -1).then(function(response) {
      console.log('response was', response);
      console.log('User?', $rootScope.user);
      console.log('votesByMemeId', $scope.votesByMemeId);
      $scope.votesByMemeId[response.memeId] = response;
      $scope.list();
    });
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
      .then(function(response) {
        console.log(response)
        if (response.status === 200 || response.id) {
          Notification.success('Successfully created.');
          // Success notification.
          $location.path('/recent');
        } else {
          // Error notification
          Notification.error(response);
        }
      }).catch(function(err) {
         Notification.error(err);
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
      .then(function(response) {
        if (response.status === 200) {
          $scope.listTemplates();
        } else {
          // Error notification.
          Notification.error(response);
        }
        $scope.isUploading = false;

      });
    }).catch(function(err) {
      $scope.isUploading = false;
      console.warn('Fail!', arguments);
    });
  };

  $scope.list();
  $scope.listTemplates();

}]);
