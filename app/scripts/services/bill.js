'use strict';

app.factory('Bill', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var draftBills = $firebase(ref.child('Bill-Draft')).$asArray();
  var approvedBills = $firebase(ref.child('Bill-Approved')).$asArray();

  var Bill = {
    create: function (bill) {
      return draftBills.$add(bill);
    },
    all: function () {
      return approvedBills;
    }
  };

  return Bill;
})
