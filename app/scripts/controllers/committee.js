/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$location,Bill,Category){
  $scope.bills = Bill.allDrafts();

  $scope.pull = function (bill) {
    //var test = Ca
    alert(bill);
  };

  /*$scope.submitBill() = function(){
    Bill.create($scope.bill).then(function (ref) {
      $location.path('/main');
    });
  };*/

});


