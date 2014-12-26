'use strict';

app.controller('AdminCtrl', function ($scope, Category) {
  var renameCategories = {};
  $scope.categories = Category.all;

  $scope.addCategory = function () {
    Category.create($scope.newCategory);
    $scope.newCategory = '';
  };

  $scope.showRename = function (category) {
    renameCategories[category.$id] = !renameCategories[category.$id];
  };

  $scope.isRename = function (category) {
    return renameCategories[category.$id];
  };

  $scope.rename = function (category) {
    Category.update(category);
    renameCategories[category.$id] = false;
  };

  $scope.deleteCategory = function (category) {
    Category.delete(category);
  }
})
