'use strict';

app.controller('PostBillCtrl', function ($scope, $location, BillDraft, Category) {
  $scope.bill = {};
  $scope.categories = Category.all;

  $scope.submitBill = function () {
    BillDraft.create($scope.bill).then(function (ref) {
      $location.path('/main');
    });
  };
});
