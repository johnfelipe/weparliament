  /**
 * Created by RoyB on 31/01/2015.
 */

'use strict';

app.factory('Nav', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  //var laws = $firebase(ref.child('Law').orderByChild('createdate').limitToFirst(10)).$asArray();
  var laws = $firebase(ref.child('Law')).$asArray();

  var Nav = {
    showNav: true
  };

  return Nav;
});
