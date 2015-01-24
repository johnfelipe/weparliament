'use strict';

app.controller('VotesFeedCtrl', function ($scope, Vote) {
  $scope.votes = Vote.all();
});
