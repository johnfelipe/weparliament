/**
 * Created by BarakRoyHome on 02/02/2015.
 */
'use strict';

app.controller('UserViewCtrl', function ($scope, $location, $rootScope, Bill, BillDraft,Law, Auth) {
  $scope.userLaws = Law.all();
  $scope.userBills = Bill.all();
  $scope.userDraftBills = BillDraft.all();

  $scope.userId = $rootScope.user.uid;

  $scope.isUser = function(elemant){
        return (elemant.Owner == $scope.userId);
  };

  $scope.delete=function(userId){
    console.log(userId);
    alert(userId);
  }
});

