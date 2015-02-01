'use strict';

app.controller('PostBillCtrl', function ($scope, $location, BillDraft, Category, Auth) {
  $scope.bill = {};
  $scope.categories = Category.all;
  var user = Auth.$getAuth();

  $scope.submitBill = function () {
    if (user)
    {
      $scope.bill.Owner = user.uid;
      $scope.bill.HandledBy = '';
      BillDraft.create($scope.bill).then(function (ref) {
        $location.path('/main');
      });
    }
  };
});
