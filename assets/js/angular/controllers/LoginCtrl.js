angular.module('mainApp').controller('LoginCtrl', [ '$scope', '$auth', 'AuthService',
  function($scope, $auth, AuthService) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

    $scope.login = function() {
      console.log('login time.');

      $scope.dataLoading = true;

      AuthService.login($scope.username, $scope.password)
        .then(function(result) {
          console.log('result:', result);
        }).catch(function(data) {
          console.error(data.error);
          $scope.error = data.error;
        }).finally(function(result) {
          console.log('always result:', result);
          $scope.dataLoading = false;
        });
    };


  }
]);
