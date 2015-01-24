'use strict';

app.controller('AdminCtrl', function ($scope, Category,Status) {
  var renameCategories = {};
  var renameStatus = {};
  $scope.categories = Category.all;
  $scope.statuses = Status.all;

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
  };

  //status//
  $scope.addStatus = function () {
    Status.create($scope.newStatus);
    $scope.newStatus = '';
  };

  $scope.showRenameStatus = function (status) {
    renameStatus[status.$id] = !renameStatus[status.$id];
  };

  $scope.isRenameStatus = function (status) {
    return renameStatus[status.$id];
  };

  $scope.renameStatus = function (status) {
    Status.update(status);
    renameStatus[status.$id] = false;
  };

  $scope.deleteStatus = function (status) {
    Status.delete(status);
  }

});
