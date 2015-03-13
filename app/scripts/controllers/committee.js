/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$rootScope,BillDraft,Category,Bill) {
  //check if user is logged on
  if (!$rootScope.user) {
    $rootScope.forceLogin('committee').then(function (success) {
        alert(success);
        $state.reload();
      },
      function (error) {
        console.log(error);
      });

  } else {
    $scope.bills = BillDraft.allUnHandled();
    $rootScope.showNav = false;

    //checking if this user has any draft bill that he started to work on
    $scope.userHandledBill = BillDraft.handeledByUser($rootScope.user.uid).$loaded().then(function (data) {
        if (data.length > 0) {
          //console.log(data.count());
          var bill;
          for (var i = 0; i < data.length; i++) {
            if (!data[i].hasOwnProperty('DenyReason')) {
              bill = data[i];
              break;
            }
          }
          /* data.foreach(function(singleData){
           if(singleData.DenyReason == null){
           bill = singleData;
           }

           })*/
          //var bill = data[0];
          var currentBill = BillDraft.get(bill.$id);
          currentBill.$loaded().then(function () {
            $scope.currentBill = currentBill;
          })
          $scope.category = Category.get(bill.Category);
        }
      }
    );
  }

  //pull draft bill from list and update the user that handle it.
  $scope.pull = function (billId) {
    var currentBill = BillDraft.get(billId).$loaded().then(function (data) {
      $scope.currentBill = data;
      $scope.category = Category.get($scope.currentBill.Category);
      $scope.currentBill.HandledBy = $rootScope.user.uid;
      BillDraft.update($scope.currentBill);
    });
  };

  //pull back a bill to the list and update that no user handle it
  $scope.pullBack = function () {
    $scope.currentBill.HandledBy = '';
    BillDraft.update($scope.currentBill).then(function (success) {
        clearScope();
      },
      function (error) {
        console.log(error);
      });

  };

  $scope.submitApproveBill = function () {
    Bill.create($scope.currentBill).then(function (ref) {
      BillDraft.remove($scope.currentBill);
      $scope.currentBill = null;
    });
  };

  $scope.submitDenyBill = function (commentText) {
    $scope.currentBill.DenyReason = commentText;
    console.log($scope.currentBill);
    BillDraft.UpdateDeny($scope.currentBill);
    $scope.currentBill = null;
    /*BillDraft.remove($scope.currentBill);
     $scope.currentBill = null;
     });*/
  };

  function clearScope() {
    $scope.currentBill = null;
  }

});


