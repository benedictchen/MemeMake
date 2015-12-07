angular.module('mainApp').controller('AuthCtrl', [
  '$scope',
  '$rootScope',
  'Notification',
  'AuthService',
  '$uibModalInstance',
  function(
    $scope,
    $rootScope,
    Notification,
    AuthService,
    $uibModalInstance) {

    var DEFAULT_LOGIN_ERROR = 'Error signing in.';

    $scope.formData = {};

    $scope.close = function() {
      $uibModalInstance.close();
    };

    $scope.register = function() {
      if (!($scope.formData.email && $scope.formData.password &&
            $scope.formData.username)) {
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
        if (result && result.id || result &&
           (result.status >= 200 && result.status < 400)) {
          Notification.success({
            title: 'Success',
            message: 'Successfully registered.  Please log in.'
          });
          $rootScope.$broadcast('authorized', result);
          $uibModalInstance.close();
        } else {
          Notification.error({
            title: 'Error',
            message: (result && result.statusText || result && result.error) ||
                     result || DEFAULT_LOGIN_ERROR
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
          if (result && result.id || result &&
             (result.status >= 200 && result.status < 400)) {
            Notification.success({
              title: 'Success',
              message: 'Successfully logged in.'
            });
            $rootScope.$broadcast('authorized', result);
            $uibModalInstance.close();
          } else {
            Notification.error({
              title: 'Error',
              message: (result && result.statusText ||
                        result && result.error) ||
                        result || DEFAULT_LOGIN_ERROR
            });
          }
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
