angular.module('mainApp').directive('meme', [
  '$rootScope',
  'VotingService',
  function($rootScope, VotingService) {

  $rootScope.votesByMemeId = $rootScope.votesByMemeId || {};

  return {
    scope: {
      onVote: '&',
    },
    templateUrl: '/templates/_meme.html',
    link: function(scope, element, attrs, ngModel) {

      console.warn('SCOOOOPE', scope);
      scope.meme = scope.$parent.meme;

      scope.isoStrToDate = function(isoString) {
        return Date.parse(isoString);
      };


      scope.upvote = function(memeId) {
        VotingService.vote(memeId, 1).then(function(response) {
          console.log('response was', response);
          console.log('User?', $rootScope.user);
          console.log('votesByMemeId', VotingService.votesByMemeId);
          VotingService.votesByMemeId[response.memeId] = response;
          scope.onVote();
        });
      };

      scope.downvote = function(memeId) {
        VotingService.vote(memeId, -1).then(function(response) {
          console.log('response was', response);
          console.log('User?', $rootScope.user);
          console.log('votesByMemeId', VotingService.votesByMemeId);
          VotingService.votesByMemeId[response.memeId] = response;
          scope.onVote();
        });
      };
    }
 };
}]);
