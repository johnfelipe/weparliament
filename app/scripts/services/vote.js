'use strict';

app.factory('Vote', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var votes = $firebase(ref.child('Vote')).$asArray();

  var Vote = {
    create: function (vote) {
      return votes.$add(vote);
    },
    all: function () {
      return votes;
    },
    get: function (voteId) {
      var result = $firebase(ref.child('Vote').child(voteId)).$asObject();
      return result;
    },
    update: function(vote){
      return votes.$save(vote);
    }
  };

  return Vote;
})
