angular.module('mainApp').factory('AuthInterceptor', [
  '$q', '$location', function($q, $location) {
  return {
    response: function(response) {
      return response;
    },
    responseError: function(response) {
      console.log('RESPONSE ERROR:', response);
      if (response.status === 401 || response.status === 403)  {
        $location.url('/login');
      }
      return $q.reject(response);
    }
  };
}]);
