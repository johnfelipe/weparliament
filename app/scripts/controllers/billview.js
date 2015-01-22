'use strict';

app.controller('BillViewCtrl', function ($scope, $stateParams, Bill,Category) {
  $scope.billId = Category.get($stateParams.billId);
});
