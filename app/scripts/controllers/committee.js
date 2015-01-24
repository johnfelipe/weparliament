/**
 * Created by RoyB on 18/01/2015.
 */
'use strict';

app.controller('CommitteeCtrl',function($scope,$location,BillDraft,Category){
  $scope.bills = BillDraft.all();
  $scope.pull = function(billCategory,title,desc) {
    $scope.category  = Category.get(billCategory);
    $scope.title = title;
    $scope.description = desc;

  };
});


