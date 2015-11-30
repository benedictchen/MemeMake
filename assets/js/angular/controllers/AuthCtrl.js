angular.module('mainApp').controller('AuthCtrl', [
  '$scope', 'Notification',
  function($scope, Notification) {


    $scope.login = function() {
      Notification.success({
        title: 'Wow!',
        message: 'You are the best!'
      });
    };

  }
]);
