'use strict';

app.controller('LawsFeedCtrl', function ($scope, Law) {
  $scope.desc = 'Laws Feed';

  $scope.laws = Law.all();
});
