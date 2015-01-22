/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$location,Bill,Category){
  $scope.bills = Bill.allDrafts();
  $scope.category = [];
  $scope.pull = function(billCategory) {
    var cat = Bill.pull(billCategory);
    $scope.category  =cat.valueOf("name");


  };
  /*$scope.submitBill() = function(){
    Bill.create($scope.bill).then(function (ref) {
      $location.path('/main');
    });
  };*/

});


