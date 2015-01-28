/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$location,BillDraft,Category,Bill){
  $scope.bills = BillDraft.allUnHandled();

  $scope.pull = function(billId) {
    $scope.currentBill = BillDraft.get(billId);
    $scope.category  = Category.get($scope.currentBill.Category);
    $scope.currentBill.HandledBy = "admin";
    BillDraft.update( $scope.currentBill);
};

  $scope.pullBack = function(){
    $scope.currentBill.HandledBy = '';
    BillDraft.update($scope.currentBill).then(function(success) {
      console.log(success);
        clearScope();
    },
      function(error) {
        console.log(error);
      });

  };

  $scope.submitApproveBill=function(){
    Bill.create( $scope.currentBill).then(function (ref) {
      $location.path('/main');});
    BillDraft.remove(currentBill);
  };

  function clearScope(){
    $scope.currentBill = null;
  }
});


