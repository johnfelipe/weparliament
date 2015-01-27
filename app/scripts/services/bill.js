'use strict';

app.factory('Bill', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var approvedBills = $firebase(ref.child('Bill-Approved')).$asArray();

  var Bill = {
    create: function (bill) {
      return approvedBills.$add(bill);
    },
    all: function () {
      return approvedBills;
    },
    get: function (billId) {
      var result = $firebase(ref.child('Bill-Approved').child(billId)).$asObject();
      return result;
    },
	update: function (bill) {
		return approvedBills.$save(bill);
	},
    remove: function (bill) {
      return approvedBills.$remove(bill);
    }
  };

  return Bill;
})
