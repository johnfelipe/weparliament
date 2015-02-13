/**
 * Created by RoyB on 28/01/2015.
 */
'use strict';

app.controller('VoteViewCtrl',function($scope,$location, $rootScope, $stateParams,Vote,Profile){
  var vote = Vote.get($stateParams.voteId);
  vote.$loaded().then(function(){
    $scope.vote = vote;
    $scope.isUserVotedAye = isUserVotedAye(vote);
    $scope.isUserVotedNo = isUserVotedNo(vote);
  });

  $scope.user = Profile.get($rootScope.user.uid);

  //check if user already voted yes.
  var isUserVotedAye = function(vote){
    if ($rootScope.user){
      if(vote.Aye){
        return vote.Aye[$rootScope.user.uid] !== undefined;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  };

  //check if user already voted no.
  var isUserVotedNo = function(vote){
    if ($rootScope.user){
      if(vote.No){
        return  vote.No[$rootScope.user.uid] !== undefined;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  };

  var ayes = Vote.getAye(vote.$id);
  ayes.$loaded().then(function()
  {
    $scope.usersAye = ayes;
  });
  var nis = Vote.getNo(vote.$id);
  nis.$loaded().then(function()
  {
    $scope.usersNo = nis;
  });

   $scope.getName = function(key){
    return  Profile.get(key);
  };

  //update the list of all users voted aye.
  $scope.aye =function () {
    if ($rootScope.user) {
      if (isUserVotedNo(vote)) {
        Vote.RemoveFromNo(vote.$id, $rootScope.user.uid);
        Vote.aye(vote.$id, $rootScope.user.uid);
      }
      else {
        if(!isUserVotedAye(vote)) {
          Vote.aye(vote.$id, $rootScope.user.uid);
        }
      }

      $scope.isUserVotedNo = false;
      $scope.isUserVotedAye = true;
    }
    else {
      $rootScope.forceLogin('to vote ');
    }
  };

  //update the list of all users voted no.
  $scope.no =function () {
    if ($rootScope.user) {
      if (isUserVotedAye(vote)) {
        Vote.RemoveFromAye(vote.$id, $rootScope.user.uid);
        Vote.no(vote.$id, $rootScope.user.uid);
      }
      else {
        if(isUserVotedNo(vote)) {
          Vote.no(vote.$id, $rootScope.user.uid);
        }
      }
      $scope.isUserVotedNo = true;
      $scope.isUserVotedAye = false;
    }
    else {
      $rootScope.forceLogin('supporting a bill');
    }
  };

  //for filter
  $scope.isUser = function(elemant){
    return (elemant !== '');

  };

});
