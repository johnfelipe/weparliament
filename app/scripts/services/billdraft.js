'use strict';

app.factory('BillDraft', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var draftBills = $firebase(ref.child('Bill-Draft')).$asArray();
  var unhandeledDraftBills =  $firebase(ref.child('Bill-Draft').orderByChild('user').startAt("").endAt("")).$asArray();

  var BillDraft = {
    create: function (bill) {
      return draftBills.$add(bill);
    },
    all: function () {
      return draftBills;
    },
    allUnHandled:function(){
      return unhandeledDraftBills;
    },
    get: function (billId) {
      var result = $firebase(ref.child('Bill-Draft').child(billId)).$asObject();
      return result;
    },
    updateUnhandled:function (bill)    {
      return unhandeledDraftBills.$save(bill)
    },
    update: function (bill) {
      return draftBills.$save(bill);
    },
    updatePollBack:function (bill)    {
      var ref = $firebase(ref.child('Bill-Draft'));
      ref.set(bill);
      return unhandeledDraftBills;
    },
    remove: function (bill) {
      return draftBills.$remove(bill);
    }

  };

  return BillDraft;
})
