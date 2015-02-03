'use strict';

app.controller('VotesFeedCtrl', function ($scope,$rootScope, Auth, Vote, Profile) {
  $scope.votes = Vote.all();

  $scope.votes.$watch(function (event) {
    $scope.votes.forEach(function (vote) {
      Profile.get(vote.Bill.Owner).$loaded().then(function (data) {
        vote.Bill.OwnerName = data.Name;
      });
    });
  });

  $scope.aye = function (vote) {
    if ($rootScope.user){
      console.log('vote is aye' + vote.$id);
    }
    else{
      $rootScope.forceLogin('voting');
    }
  };

  $scope.no = function (vote) {
    if ($rootScope.user){
      console.log('vote is no' + vote.$id);
    }
    else{
      $rootScope.forceLogin('voting');
    }
  };
});
