/**
 * Created by RoyB on 28/01/2015.
 */
'use strict';

app.controller('VoteViewCtrl',function($scope,$location, $rootScope, $stateParams,Vote,Profile){
  var vote = Vote.get($stateParams.voteId);
  vote.$loaded().then(function(){
    $scope.vote = vote;
  });

  var i = 0;
  var ayes = Vote.getAye(vote.$id);
  ayes.$loaded().then(function(){
   // $scope.usersAye = ayes;
    $scope.usersAye=[];
    angular.forEach(ayes,function(aye,key){
      //console.log(aye + ' ' + key);
      Profile.get(key).$loaded().then(function (data) {
        console.log(data.Name);
        $scope.usersAye[i] = data.Name;
        //nameList.add(data.Name)
        i++;
      })
    })
  });
  var nos = Vote.getNo(vote.$id);
  nos.$loaded().then(function() {
    // $scope.usersAye = ayes;
    $scope.usersNo = [];
    angular.forEach(nos, function (nos, key) {
      //console.log(aye + ' ' + key);
      Profile.get(key).$loaded().then(function (data) {
        console.log(data.Name);
        $scope.usersNo[i] = data.Name;
        //nameList.add(data.Name)
        i++;
      })
    })
  });
  //$scope.usersAye =
  /*$scope.usersAye = vote.No;*/

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
    }
    else {
      $rootScope.forceLogin('to vote ');
    }
  };

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
    }
    else {
      $rootScope.forceLogin('supporting a bill');
    }
  };

  var isUserVotedAye = function(vote){
    if ($rootScope.user){
      return (vote.Aye && vote.Aye[$rootScope.user.uid]);
    }
    else{
      return false;
    }
  }

  var isUserVotedNo = function(vote){
    if ($rootScope.user){
      return (vote.No && vote.No[$rootScope.user.uid]);
    }
    else{
      return false;
    }
  }
});
