'use strict';

app.factory('Auth', function (FIREBASE_URL, $firebaseAuth) {
	var ref = new Firebase(FIREBASE_URL);
	return $firebaseAuth(ref);
})