/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('BillCtrl',function($scope,$location,Bill){
  $scope.bill = {};
  $scope.submitBill() = function(){
    Bill.create($scope.bill).then(function (ref) {
      $location.path('/main');
    });
  };

})


