/**
 * Created by BarakRoyHome on 02/02/2015.
 */
'use strict';

app.controller('UserViewCtrl', function ($scope, $location,$stateParams, $rootScope, Bill, BillDraft,Law, Profile) {
  $scope.userLaws = Law.all();
  $scope.userBills = Bill.all();
  $scope.userDraftBills = BillDraft.allUnHandled();
  $scope.profile = Profile.get($stateParams.userId);
  var isIAmTheUser = function() {
     if ($rootScope.user) {
       return $rootScope.user.uid === $stateParams.userId;
     }
     else {
       return false;
     }
   };

  var isFollowedByMe = function() {
    if($scope.profile.Followers && $scope.profile.Followers [$scope.userId]){
      return true;
    }
    else{
      return false;
    }
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

  $scope.delete=function(userId){
    console.log(userId);
    alert(userId);
  }

  $scope.follow = function(){
    var isFollow = isFollowedByMe();
      if(!isFollow) {
        Profile.addFollower($scope.userId, $stateParams.userId);
      }
      else{
        Profile.removeFollower($scope.userId, $stateParams.userId);
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
});

