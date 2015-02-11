'use strict';

app.factory('Settings', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var settings = $firebase(ref.child('Settings')).$asArray();

  var Settings = {
    all: settings,
    create: function (setting) {
      $firebase(ref.child('Settings')).$set(setting.Key, setting.Value);
    },
    delete: function (setting) {
      return settings.$remove(setting);
    },
    update: function (setting){
      return settings.$save(setting);
    },
    get: function (settingId) {
      return  $firebase(ref.child('Settings').child(settingId)).$asObject();
    }
  };

  return Settings;
});
