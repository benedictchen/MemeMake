angular.module('mainApp').controller('AuthCtrl', [
  '$scope', 'Notification', 'AuthService', '$uibModalInstance',
  function($scope, Notification, AuthService, $uibModalInstance) {

    $scope.formData = {};

    $scope.close = function() {
      $uibModalInstance.close();
    };

    $scope.register = function() {
      if (!($scope.formData.email && $scope.formData.password)) {
        Notification.error({
          title: 'Error',
          message: 'Username and/or password missing.'
        });
        return;
      }
      AuthService.register({
        username: $scope.formData.username,
        email: $scope.formData.email,
        password: $scope.formData.password
      })
      .then(function(result) {
        console.log(result);
        if (result.id || (result.status >= 200 && result.status < 400)) {
          Notification.success({
            title: 'Success',
            message: 'Successfully registered.  Please log in.'
          });
          $uibModalInstance.close();
        } else {
          Notification.error({
            title: 'Error',
            message: (result.statusText || result.error)
          });
        }
      }).catch(function(err) {
        console.error(err);
        var errorMsg = err;
        Notification.error({
          title: 'Error',
          message: errorMsg
        });
      });
    };

    $scope.login = function() {
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
            title: 'Success',
            message: 'Successfully logged in.'
          });
          $uibModalInstance.close();
        }).catch(function(err) {
          console.error(err);
          var errorMsg = JSON.stringify(err);
          Notification.error({
            title: 'Error',
            message: errorMsg
          });
        });
    };

    $scope.setType = function(type) {
      $scope.type = type;
    };

  }
]);
