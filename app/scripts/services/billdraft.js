'use strict';

app.factory('BillDraft', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var draftBills = $firebase(ref.child('Bill-Draft')).$asArray();

  var BillDraft = {
    create: function (bill) {
      return draftBills.$add(bill);
    },
    all: function () {
      return draftBills;
    },
    get: function (billId) {
      var result = $firebase(ref.child('Bill-Draft').child(billId)).$asObject();
      return result;
    },
	update: function (bill) {
		return draftBills.$save(bill);
	},
    remove: function (bill) {
      return draftBills.$remove(bill);
    }

  };

  return BillDraft;
})
