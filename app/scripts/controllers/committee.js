/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$location,Bill,Category){
  $scope.bills = Bill.allDrafts();
  /*$scope.category = [];
  $scope.bill = [];
  $scope.title=[];
  $scope.description=[];*/
  $scope.pull = function(billCategory,title,desc) {
    var cat = Bill.pull(billCategory);
    $scope.category  =cat.valueOf("name");
    $scope.title = title;
    $scope.description = desc;

  };
  /*$scope.submitBill() = function(){
    Bill.create($scope.bill).then(function (ref) {
      $location.path('/main');
    });
  };*/

});


