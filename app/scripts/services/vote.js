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
    },
    aye: function (voteid, userid){
      $firebase(ref.child('Vote').child(voteid).child('Aye')).$set(userid, true);
    },
    no: function (voteid, userid){
      $firebase(ref.child('Vote').child(voteid).child('No')).$set(userid, true);
    },
    RemoveFromAye: function (voteid, userid){
      $firebase(ref.child('Vote').child(voteid).child('Aye')).$remove(userid);
    },
    RemoveFromNo: function (voteid, userid){
      $firebase(ref.child('Vote').child(voteid).child('No')).$remove(userid);
    },
    getAye: function (voteId) {
      var result = $firebase(ref.child('Vote').child(voteId).child('Aye')).$asObject();
      return result;
    },
    getNo: function (voteId) {
      var result = $firebase(ref.child('Vote').child(voteId).child('No')).$asObject();
      return result;
    }
  };

  return Vote;
})
