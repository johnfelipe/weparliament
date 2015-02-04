'use strict';

app.controller('BillViewCtrl', function ($scope, $rootScope, $stateParams, Bill, Category, Profile) {
  var bill = Bill.get($stateParams.billId);  
  bill.$loaded().then(function () {	
    $scope.bill = bill;	
    $scope.category = Category.get(bill.Category);	
	Profile.get(bill.Owner).$loaded().then(function (data) {
        $scope.ownerName = data.Name;
      });
  });

  $scope.support = function () {
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

  $scope.supportBillCaption = function () {
    if (isUserSupportBill(bill)){
		return 'Cancel Support';
	}	
	else{
		return 'Support';
	}
  }
});
