/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$location,BillDraft,Category,Bill){
  $scope.bills = BillDraft.all();
  var currentBill;
  $scope.pull = function(billCategory,bill) {
    $scope.category  = Category.get(billCategory);
    $scope.title = bill.Title;
    $scope.description = bill.Description;
    bill.status = "InProgress";
    currentBill = bill;

};
  $scope.pullBack = function(){
    //var bill = BillDraft.get(currentBill.$id);
    currentBill.status="Waiting";
    clearScope();
  };
  $scope.submitApproveBill=function(){
    currentBill.status = 'Approved';
    Bill.create(currentBill).then(function (ref) {
      $location.path('/main');});
  };

  function clearScope()
  {
    $scope.category  = null;
    $scope.title = null;
    $scope.description = null;
  }

});


