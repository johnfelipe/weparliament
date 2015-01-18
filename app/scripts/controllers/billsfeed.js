'use strict';

app.controller('BillsFeedCtrl', function ($scope, Bill) {
  $scope.desc = 'Bills Feed';
  $scope.bills = Bill.all();
});
