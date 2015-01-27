/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$location,BillDraft,Category,Bill){
  $scope.bills = BillDraft.all();
  var currentBill;
  $scope.pull = function(bill) {
    currentBill = bill;
    $scope.category  = Category.get(bill.Category);
    $scope.currentBill = currentBill;
    bill.status = "InProgress";
    currentBill = bill;
};

  $scope.pullBack = function(){
    currentBill.status="Waiting";
    clearScope();
  };

  $scope.submitApproveBill=function(){
    currentBill.status = 'Approved';
    Bill.create(currentBill).then(function (ref) {
      $location.path('/main');});
    BillDraft.remove(currentBill);
  };

  function clearScope(){
    $scope.currentBill = null;
  }

});


