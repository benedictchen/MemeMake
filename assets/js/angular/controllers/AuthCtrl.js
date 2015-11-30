angular.module('mainApp').controller('AuthCtrl', [
  '$scope', 'Notification', 'AuthService',
  function($scope, Notification, AuthService) {

    $scope.formData = {};

    $scope.login = function() {
      if ($scope.type === 'login') {
        if (!($scope.formData.email && $scope.formData.password)) {
          Notification.error({
            title: 'Error',
            message: 'Username and/or password missing.'
          });
          return;
        }
        AuthService.login($scope.formData.email, $scope.formData.password)
          .then(function(result) {
            console.log(result);
            Notification.success({
              title: 'Success?',
              message: 'Successfully logged in?'
            });
          }).catch(function(err) {
            Notification.error({
              title: 'Error',
              message: JSON.stringify(err)
            });
          });
      }
    };

    $scope.setType = function(type) {
      $scope.type = type;
    };

  }
]);
