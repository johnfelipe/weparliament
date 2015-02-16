'use strict';

app.factory('Profile', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);

  var Profile = {
    create: function (user) {

	    var profile = $firebase(ref.child('Profile').child(user.uid)).$asObject();
      profile.$loaded().then(function (data) {
        if (data.$value === null){
          var newProfile = {
            Facebook: user.facebook.id,
            Name: user.facebook.displayName
          };
          $firebase(ref.child('Profile')).$set(user.uid, newProfile);
        }
        else{
          profile.Name = user.facebook.displayName;
          profile.$save();
        }
      });
    },
    get: function (profileId) {
      return $firebase(ref.child('Profile').child(profileId)).$asObject();;
    },
    addFollower: function (loggedUserId,profileId){
      $firebase(ref.child('Profile').child(profileId).child('Followers')).$set(loggedUserId, true);
    },
    removeFollower: function (loggedUserId,profileId){
      $firebase(ref.child('Profile').child(profileId).child('Followers')).$remove(loggedUserId);
    },
    getFollowers: function (profileId) {
      return $firebase(ref.child('Profile').child(profileId).child('Followers')).$asObject();
    }

  };

  return Profile;
})
