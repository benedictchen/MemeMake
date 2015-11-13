angular.module('mainApp').factory('AuthService', [
  '$http', '$q', function($http, $q) {
    var MemeService = {

      /**
       * @return {Promise} Promise that may be fulfilled asynchronously.
       */
      login: function(username, password) {
        var deferred = $q.defer();
        $http.post('/auth/login', {
          username: username,
          password: password,
          type: 'local'
        }).success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      /**
       * @return {Promise} Promise that may be fulfilled asynchronously.
       */
      register: function(username, email, password) {
        var deferred = $q.defer();
        $http.post('/auth/register', {
          username: username,
          email: email,
          password: password,
          type: local
        }).success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

    };
    return MemeService;
  }
]);
