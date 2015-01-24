'use strict';

app.controller('BillsFeedCtrl', function ($scope, Bill) {
  $scope.desc = 'Bills Feed';
  $scope.bills = Bill.all();

  $scope.supportBill = function (bill) {
    console.log(bill.$id + ' is supported.');
  };

  $scope.supportBillCaption = function (bill) {
    // return Support/Cancel Support according to bill status
    return 'Support';
  }
});
