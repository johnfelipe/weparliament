'use strict';

app.factory('BillDraft', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var draftBills = $firebase(ref.child('Bill-Draft')).$asArray();
  var unhandeledDraftBills =  $firebase(ref.child('Bill-Draft').orderByChild('HandledBy').startAt("").endAt("")).$asArray();

  var BillDraft = {
    create: function (bill) {
      bill.CreateDate = Firebase.ServerValue.TIMESTAMP;
      return draftBills.$add(bill);
    },
    all: function () {
      return draftBills;
    },
    allUnHandled:function(){
      return unhandeledDraftBills;
    },
    get: function (billId) {
      return draftBills.$getRecord(billId);
    },
    update: function (bill) {
      return draftBills.$save(bill);
    },
    remove: function (bill) {
      return draftBills.$remove(bill);
    },
    handeledByUser:function(userId){
      return $firebase(ref.child('Bill-Draft').orderByChild('HandledBy').startAt(userId).endAt(userId)).$asArray();
    }

  };

  return BillDraft;
})
