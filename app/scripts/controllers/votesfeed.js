'use strict';

app.controller('VotesFeedCtrl', function ($scope, Vote, Profile) {
  $scope.votes = Vote.all();

  $scope.votes.$watch(function (event) {
    $scope.votes.forEach(function (vote) {
      Profile.get(vote.Bill.Owner).$loaded().then(function (data) {
        vote.Bill.OwnerName = data.Name;
      });
    });
  });
});
