'use strict';

app.controller('PostBillCtrl', function ($scope, $location, BillDraft, Category) {
  $scope.bill = {};
  $scope.categories = Category.all;

  $scope.submitBill = function () {
    $scope.bill.status='Waiting';
    BillDraft.create($scope.bill).then(function (ref) {
      $location.path('/main');
    });
  };
});
