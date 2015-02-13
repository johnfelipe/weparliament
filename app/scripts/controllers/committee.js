/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$rootScope,BillDraft,Category,Bill,Nav) {
  //check if user is logged on
  if ($rootScope.user) {
    $scope.bills = BillDraft.allUnHandled();
    Nav.showNav = false;

    //checking if this user has any draft bill that he started to work on
    $scope.userHandledBill = BillDraft.handeledByUser($rootScope.user.uid).$loaded().then(function (data) {
        if (data.length > 0) {
          var bill = data[0];
          var currentBill = BillDraft.get(bill.$id);
          currentBill.$loaded().then(function (data) {
            $scope.currentBill = currentBill;
          })
          $scope.category = Category.get(bill.Category);
        }
      }
    );
  }
  else {
    $rootScope.forceLogin('committee').then(function (success) {
        alert(success);
        $state.reload();
      },
      function (error) {
        console.log(error);
      });

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

  function clearScope() {
    $scope.currentBill = null;
  }

});


