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
		if (isUserSupportBill(bill)){
			Bill.unsupport(bill.$id, $rootScope.user.uid);
		}
		else{
			Bill.support(bill.$id, $rootScope.user.uid);
		}
    }
    else{
      $rootScope.forceLogin('supporting a bill');
    }
  };

  var isUserSupportBill = function(bill){
    if ($rootScope.user){
      return (bill.Supporters && bill.Supporters[$rootScope.user.uid]);
    }
    else{
      return false;
    }
  }

  // temporary function
  $scope.createVote = function (bill) {
    var vote = {};
    vote.Bill = bill;
    Vote.create(vote);
    Bill.remove(bill);
  };

  $scope.supportBillCaption = function (bill) {
    if (isUserSupportBill(bill)){
		return 'Cancel Support';
	}
	else{
		return 'Support';
	}
  };

});
