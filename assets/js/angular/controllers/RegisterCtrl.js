angular.module('mainApp').controller('RegisterCtrl', [ '$scope', '$auth', 'AuthService',
  function($scope, $auth, AuthService) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

    $scope.register = function() {
      console.log('register time.');

      $scope.dataLoading = true;

      AuthService.register($scope.username, $scope.email, $scope.password)
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
