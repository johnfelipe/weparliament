'use strict';

app.controller('GeneralModalCtrl', function ($scope, $modalInstance, message) {
  console.log(message);
  $scope.message = message;

  $scope.ok = function () {
    $modalInstance.close();
  };
});
