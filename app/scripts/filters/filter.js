'use strict';

app.filter('StatusFilter', function() {
  return function (items, status) {
    var filtered = [];
    //var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.status == status) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});
