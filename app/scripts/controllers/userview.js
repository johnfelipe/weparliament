/**
 * Created by BarakRoyHome on 02/02/2015.
 */
'use strict';

app.controller('UserViewCtrl', function ($scope, $location, $stateParams, Bill, BillDraft,Law, Auth) {
  $scope.userLaws = Law.all();
  $scope.userBills = Bill.all();
  $scope.userDraftBills = BillDraft.all();
  console.log($stateParams);
});

