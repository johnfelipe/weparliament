'use strict';

app.factory('Law', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var laws = $firebase(ref.child('Law')).$asArray();

  var Law = {
    create: function (law) {
      return laws.$add(law);
    },
    all: function () {
      return laws;
    },
    get: function (lawId) {
      var result = $firebase(ref.child('Law').child(lawId)).$asObject();
      return result;
    }
  };

  return Law;
})
