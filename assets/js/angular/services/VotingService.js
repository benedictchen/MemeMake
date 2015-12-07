angular.module('mainApp').factory('VotingService', [
  '$http', '$q',
  function($http, $q) {
    var VotingService = {

      vote: function(memeId, directionValue) {
        var deferred = $q.defer();
        $http.post('/vote', {
          memeId: memeId,
          directionValue: directionValue
        }).success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

    };
    return VotingService;
  }
]);
