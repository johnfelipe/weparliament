/**
 * Created by RoyB on 28/01/2015.
 */
'use strict';

app.controller('VoteViewCtrl',function($scope,$location,$stateParams,Vote){
  console.log($stateParams.voteId)
  var vote = Vote.get($stateParams.voteId);
  vote.$loaded().then(function () {
    console.log($stateParams.voteId);
    $scope.vote = vote;
  });
});
