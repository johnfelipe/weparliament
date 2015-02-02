/**
 * Created by BarakRoyHome on 02/02/2015.
 */
'use strict';

app.controller('UserViewCtrl', function ($scope, $location, $stateParams, Bill, Law, Auth) {
  $scope.userLaws = Law.all();
});

