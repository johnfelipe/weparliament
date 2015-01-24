'use strict';

app.controller('BillsFeedCtrl', function ($scope, Bill, Vote) {
  $scope.bills = Bill.all();

  $scope.supportBill = function (bill) {
    console.log(bill.$id + ' is supported.');
  };

  // temporary function
  $scope.createVote = function (bill) {
    var vote = {};
    vote.Bill = bill;
    Vote.create(vote);
    Bill.remove(bill);
  };

  $scope.supportBillCaption = function (bill) {
    // return Support/Cancel Support according to bill status
    return 'Support';
  }
});
