/**
 * Created by RoyB on 28/01/2015.
 */
'use strict';

app.controller('VoteViewCtrl',function($scope,$location, $rootScope, $stateParams,Vote,Profile){
  var vote = Vote.get($stateParams.voteId);
  vote.$loaded().then(function(){
    $scope.vote = vote;
  });

  $scope.user = Profile.get($rootScope.user.uid);

   new Refresh();

  //refresh the users vote lists.
  function Refresh() {
    $scope.usersAye =[];
    $scope.usersno=[];
    var i = 0;
    //update the scope for all users voted aye.
    var ayes = Vote.getAye(vote.$id);
    ayes.$loaded().then(function () {
      // $scope.usersAye = ayes;
      var listNameAye = [];
      angular.forEach(ayes, function (aye, key) {
        //console.log(aye + ' ' + key);
        Profile.get(key).$loaded().then(function (data) {
          console.log(data.Name);
          //$scope.usersAye[i] = data.Name;
          listNameAye[i] = data.Name;
          //nameList.add(data.Name)
          i++;
        }).then(function(){
          $scope.usersAye = listNameAye;
        });

      });

    });

    //update the scope for all users voted no.
    var nos = Vote.getNo(vote.$id);
    nos.$loaded().then(function () {
      // $scope.usersAye = ayes;
      //$scope.usersNo = [];
      var listName = [];
      angular.forEach(nos, function (no, key) {
        console.log(no + ' ' + key);
        Profile.get(key).$loaded().then(function (data) {
          console.log(data.Name);
          listName[i] = data.Name;
          //nameList.add(data.Name)
          i++;
        }).then(function(){
          $scope.usersNo = listName;
        });
      });
    });
  }

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
    }
    else {
      $rootScope.forceLogin('to vote ');
    }
    new Refresh();
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
    }
    else {
      $rootScope.forceLogin('supporting a bill');
    }
    new Refresh();
  };


  //check if user already voted yes.
  var isUserVotedAye = function(vote){
    if ($rootScope.user){
      return (vote.Aye && vote.Aye[$rootScope.user.uid]);
    }
    else{
      return false;
    }
  };
  $scope.isUserVotedAye = isUserVotedAye(vote);

  //check if user already voted no.
  var isUserVotedNo = function(vote){
    if ($rootScope.user){
      return (vote.No && vote.No[$rootScope.user.uid]);
    }
    else{
      return false;
    }
  };
  $scope.isUserVotedNo = isUserVotedNo(vote);

  //for filter
  $scope.isUser = function(elemant){
    return (elemant != null);

  };

});
