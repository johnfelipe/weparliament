/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$location,BillDraft,Category,Bill){
  $scope.bills = BillDraft.allUnHandled();
  var currentBill;
  $scope.pull = function(bill) {
    currentBill = bill;
    $scope.category  = Category.get(bill.Category);
    $scope.currentBill = currentBill;
    currentBill.user = "admin";
    BillDraft.updateUnhandled(currentBill)
};

  $scope.pullBack = function(){
    //var bills = BillDraft.all()
    currentBill.user = "";
    BillDraft.update(currentBill);
    clearScope();
  };

  $scope.submitApproveBill=function(){
    //currentBill.status = 'Approved';
    Bill.create(currentBill).then(function (ref) {
      $location.path('/main');});
    BillDraft.remove(currentBill);
  };

  function clearScope(){
    $scope.currentBill = null;
  }
  /*window.onbeforeunload = function() { return "You work will be lost."; };*/

});


