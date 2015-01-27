'use strict';

app.controller('LawViewCtrl', function ($scope, $stateParams, Law, Category) {
  var law = Law.get($stateParams.lawId);
  law.$loaded().then(function () {
    $scope.law = law;	
    $scope.category = Category.get(law.Category);
  });
});
