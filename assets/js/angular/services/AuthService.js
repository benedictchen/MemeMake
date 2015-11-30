angular.module('mainApp').factory('AuthService', [
  '$http', '$q',
  function($http, $q) {
    var AuthService = {
      login: function(email, password) {
        var deferred = $q.defer();
        $http.post('/auth/login', {
          email: email,
          password: password
        }).success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },
    };
    return AuthService;
  }
]);


