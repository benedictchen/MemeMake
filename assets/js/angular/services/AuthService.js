angular.module('mainApp').factory('AuthService', [
  '$http', '$q',
  function($http, $q) {
    var AuthService = {
      login: function() {
        var deferred = $q.defer();
        $http.get('/auth/login').success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },
    }
  }
]);
