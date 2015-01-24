'use strict';

app.controller('BillViewCtrl', function ($scope, $stateParams, Bill, Category) {
  var bill = Bill.get($stateParams.billId);
  bill.$loaded().then(function () {
    $scope.bill = bill;
    $scope.category = Category.get(bill.Category);
  });

  $scope.support = function () {
    console.log('supported');
  };

  $scope.createVote = function () {
    console.log('vote created');
  };
});
