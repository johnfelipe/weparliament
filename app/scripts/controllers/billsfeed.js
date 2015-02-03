'use strict';

app.controller('BillsFeedCtrl', function ($scope, $rootScope, $resource, Bill, Profile, Vote) {
  $scope.bills = Bill.all();

  $scope.bills.$watch(function (event) {
    $scope.bills.forEach(function (bill) {
      Profile.get(bill.Owner).$loaded().then(function (data) {
        bill.OwnerName = data.Name;
      });
    });
  });

  $scope.supportBill = function (bill) {
    if ($rootScope.user){
      console.log(bill.$id + ' is supported.');
    }
    else{
      $rootScope.forceLogin('supporting a bill');
    }
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
  };

});
