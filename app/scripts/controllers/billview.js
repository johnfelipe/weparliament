'use strict';

app.controller('BillViewCtrl', function ($scope, $stateParams, Bill) {
  $scope.billId = $stateParams.billId;
});
