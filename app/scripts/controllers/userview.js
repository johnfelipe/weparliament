/**
 * Created by BarakRoyHome on 02/02/2015.
 */
'use strict';

app.controller('UserViewCtrl', function ($scope, $location,$stateParams, $rootScope,$anchorScroll, Bill, BillDraft,Law, Profile) {
  $scope.userLaws = Law.all();
  $scope.userBills = Bill.all();
  $scope.userDraftBills = BillDraft.allUnHandled();
  $scope.profile = Profile.get($stateParams.userId);
  $scope.messageBoard = Profile.getMessages($rootScope.user.uid);

  //get all users i follow
  $scope.following = Profile.getFollowing($stateParams.userId);
  //get all users follow me
  $scope.followers = Profile.getFollowers($stateParams.userId);

  var isIAmTheUser = function() {
    if ($rootScope.user) {
      return $rootScope.user.uid === $stateParams.userId;
    }
    else {
      return false;
    }
  };

  var isFollowedByMe = function() {
    return ($scope.profile.Followers && $scope.profile.Followers [$scope.userId]);/*{
     return true;
     }
     else{
     return false;
     }*/
  };

  $scope.IsFollowedbyMe = isFollowedByMe();
  $scope.myProfile = isIAmTheUser();
  $scope.userId = $rootScope.user.uid;

  $scope.isUser = function(element){
    if(isIAmTheUser()){
      return (element.Owner == $scope.userId);
    }
    else{
      return false;
    }
  };

  /*$scope.delete=function(userId){
   console.log(userId);
   alert(userId);
   };*/

  $scope.follow = function(){
    var isFollow = isFollowedByMe();
    if(!isFollow) {
      Profile.addFollower($scope.userId, $stateParams.userId);
      Profile.addFollowing($scope.userId, $stateParams.userId);
    }
    else{
      Profile.removeFollower($scope.userId, $stateParams.userId);
      Profile.removeFollowing($scope.userId, $stateParams.userId);
    }
    $scope.profile = Profile.get($stateParams.userId);
  };

  $scope.buttonLabel = function(){
    if(isFollowedByMe()){
      return 'UnFollow';
    }
    else{
      return 'Follow';
    }
  };

  $scope.getName = function(key){
    return  Profile.get(key);
  };

  $scope.writeMessage = function(){

  };

  $scope.submitMessage = function(messageArea){
    Profile.commitMessage(messageArea,$stateParams.userId,$scope.userId);
  };

  $scope.gotoBottom = function() {
    $anchorScroll();
  };

  $scope.formattedMessage = function(msg){
    var time = new Date(msg.ArriveAt);
    var localTime = time.toLocaleDateString() + ' ' + time.toLocaleTimeString();
    var message = msg.Message;
    var messageObj = {
      ArriveAt:localTime,
      Message:message,
      User:'',
      Name:''
    };

    Profile.get(msg.User).$loaded().then(function(data){
      messageObj.User = data.Facebook;
      messageObj.Name = data.Name;
    });
    return messageObj;
  };
});

