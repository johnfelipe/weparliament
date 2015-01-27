'use strict';

app.factory('Category', function (FIREBASE_URL, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var categories = $firebase(ref.child('Category')).$asArray();

  var Category = {
    all: categories,
    create: function (category) {
      categories.$add(category);
    },
    delete: function (category) {
      return categories.$remove(category);
    },
    update: function (category){
      return categories.$save(category);
    },
    get: function (categoryId) {
      return  $firebase(ref.child('Category').child(categoryId)).$asObject();
    }
  };

  return Category;
});
