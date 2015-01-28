'use strict';

app.factory('Profile', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  
  var Profile = {
    create: function (profile) {
      //return approvedBills.$add(bill);
	  console.log('profile id ' + profile.uid);
	  var p = $firebase(ref.child('Profile').child(profile.uid)).$asObject();
		p.$loaded().then(function(){
			if (!p.$value){
			};
		});
    },   
    get: function (profileId) {
      var result = $firebase(ref.child('Profile').child(profileId)).$asObject();
      return result;
    }
  };

  return Profile;
})
