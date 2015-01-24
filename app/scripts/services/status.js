'use strict';

app.factory('Status', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var statuses = $firebase(ref.child('Status')).$asArray();

  var Status = {
    all: statuses,
    create: function (status) {
      statuses.$add(status);
    },
    delete: function (status) {
      return statuses.$remove(status);
    },
    update: function (status){
      return statuses.$save(status);
    }
  };

  return Status;
});
/**
 * Created by BarakRoyHome on 24/01/2015.
 */
