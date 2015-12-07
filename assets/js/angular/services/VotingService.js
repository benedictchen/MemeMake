 angular.module('mainApp').factory('VotingService', [
  '$http', '$q',
  function($http, $q) {
    var VotingService = {

      list: function() {
        var deferred = $q.defer();
        $http.get('/vote').success(function(result) {
          if (!result) {
            return deferred.reject(result);
          }
          if (result.status < 200 || result.status >= 400 ||
              typeof result === 'string') {
            return deferred.reject(result);
          } else {
            deferred.resolve(result);
          }
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

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
