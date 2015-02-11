'use strict';

app.controller('AdminCtrl', function ($scope, $rootScope, Category, Settings) {
  var renameCategories = {};
  var editSettings = {};
  $scope.categories = Category.all;

  $scope.addCategory = function () {
    Category.create($scope.newCategory);
    $scope.newCategory = '';
  };

  $scope.showRenameCategory = function (category) {
    renameCategories[category.$id] = !renameCategories[category.$id];
  };

  $scope.isRenameCategory = function (category) {
    return renameCategories[category.$id];
  };

  $scope.renameCategory = function (category) {
    Category.update(category);
    renameCategories[category.$id] = false;
  };

  $scope.deleteCategory = function (category) {
    Category.delete(category);
  };

  $scope.settings = Settings.all;
  $scope.newSetting = {};

  $scope.addSetting = function () {
    Settings.create($scope.newSetting);
    $scope.newSetting = {};
  };

  $scope.showEditSetting = function (setting) {
    editSettings[setting.$id] = !editSettings[setting.$id];
  };

  $scope.isEditSetting = function (setting) {
    return editSettings[setting.$id];
  };

  $scope.updateSetting = function (setting) {
    Settings.update(setting);
    editSettings[setting.$id] = false;
  };

  $scope.deleteSetting = function (setting) {
    Settings.delete(setting);
  };
});
