'use strict';

app.factory('Bill', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var draftBills = $firebase(ref.child('Bill-Draft')).$asArray();
  var approvedBills = $firebase(ref.child('Bill-Approved')).$asArray();
  //var categories = $firebase(ref.child('Category')).$asObject();

  var Bill = {
    create: function (bill) {
      return draftBills.$add(bill);
    },
    all: function () {
      return approvedBills;
    },
    get: function (billId) {
      var result = $firebase(ref.child('Bill-Approved').child(billId)).$asObject();
      return result;
    },
    allDrafts: function () {
      return draftBills;
    }
    //,
    //pull: function (billCategory) {
    //  return  $firebase(ref.child('Category').child(billCategory).child('Name')).$asObject();
    //},
    //comments: function (billId) {
    //  return $firebase(ref.child('comments').child(billId)).$asArray();
    //}
  };

  return Bill;
})
