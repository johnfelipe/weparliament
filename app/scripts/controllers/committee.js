/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$rootScope,BillDraft,Category,Bill,Nav) {
  //check if user is logged on
  if ($rootScope.user) {
    $scope.bills = BillDraft.allUnHandled();
    console.log($rootScope.user.uid);
    Nav.showNav = false;

    //checking if this user has any draft bill that he started to work on
    $scope.userHandledBill = BillDraft.handeledByUser($rootScope.user.uid).$loaded().then(function (data) {
        if (data.length > 0) {
          $scope.currentBill = data[0];
          $scope.category = Category.get($scope.currentBill.Category);
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
    console.log('pull ' + billId);
    $scope.currentBill = BillDraft.get(billId);
    $scope.category = Category.get($scope.currentBill.Category);
    $scope.currentBill.HandledBy = $rootScope.user.uid;
    BillDraft.update($scope.currentBill);
  };

  //pull back a bill to the list and update that no user handle it
  $scope.pullBack = function () {
    $scope.currentBill = BillDraft.get($scope.currentBill.$id);
    $scope.currentBill.HandledBy = '';
    BillDraft.update($scope.currentBill).then(function (success) {
        console.log(success);
        clearScope();
      },
      function (error) {
        console.log(error);
      });

  };

  $scope.submitApproveBill = function () {
    Bill.create($scope.currentBill).then(function (ref) {
      $location.path('/main');
    });
    BillDraft.remove(currentBill);
  };

  function clearScope() {
    $scope.currentBill = null;
  }

});


