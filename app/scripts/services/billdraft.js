'use strict';

app.factory('BillDraft', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var unhandeledDraftBills =  $firebase(ref.child('Bill-Draft').orderByChild('HandledBy').startAt("").endAt("")).$asArray();

  var BillDraft = {
    create: function (bill) {
      return $firebase(ref.child('Bill-Draft')).$push(bill);
    },
    allUnHandled:function(){
      return unhandeledDraftBills;
    },
    get: function (billId) {
      return $firebase(ref.child('Bill-Draft').child(billId)).$asObject();
    },
    update: function (bill) {
      return $firebase(ref.child('Bill-Draft').child(bill.$id)).$set("HandledBy", bill.HandledBy);
    },
    remove: function (bill) {
      return $firebase(ref.child('Bill-Draft')).$remove(bill.$id);
    },
    handeledByUser:function(userId){
      return $firebase(ref.child('Bill-Draft').orderByChild('HandledBy').startAt(userId).endAt(userId)).$asArray();
    }

  };

  return BillDraft;
})
