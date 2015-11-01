angular.module('mainApp').factory('MemeService', [
  '$http', '$q',
  function($http, $q) {
    return {
      list: function() {
        var deferred = $q.defer();
        $http.get('/meme').success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },
    };
  }
]);
