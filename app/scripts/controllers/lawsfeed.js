'use strict';

app.controller('LawsFeedCtrl', function ($scope, Law, Profile) {
  $scope.desc = 'Laws Feed';

  $scope.laws = Law.all();

  $scope.laws.$watch(function (event) {
    $scope.laws.forEach(function (law) {
      Profile.get(law.Owner).$loaded().then(function (data) {
        law.OwnerName = data.Name;
      });
    });
  });

});
