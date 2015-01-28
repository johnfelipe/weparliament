/**
 * Created by RoyB on 28/01/2015.
 */
'use strict';

app.controller('VoteViewCtrl',function($scope,$location,$stateParams,Vote){
  $scope.vote = Vote.get($stateParams.voteId);
 console.log($scope.vote);
  $scope.counterAye = 0;
  $scope.counterNo = 0;
  $scope.aye = function(userId){
    $scope.counterAye ++;
    console.log('user voted for the law');
  }

  $scope.no = function(userId){
    $scope.counterNo++
    console.log('user voted against the law');
  }

});
