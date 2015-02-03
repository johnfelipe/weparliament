'use district';

app.controller('NavCtrl', function ($scope, $rootScope, $state, $modal, Category, Auth, Profile) {
	$scope.categories = Category.all;
  $rootScope.user = $scope.user = Auth.$getAuth();

	Auth.$onAuth(function(authData) {
    $rootScope.user = $scope.user = Auth.$getAuth();
	  if ($scope.user){
		  Profile.create($scope.user);
	  };
	});

	$scope.logIn = function(){
		Auth.$authWithOAuthPopup('facebook');
	};

	$scope.logOut = function(){
		Auth.$unauth();
	};

  $scope.postBill = function () {
    if ($scope.user) {
      $state.go('postbill');
    }
    else{
      $rootScope.forceLogin('suggesting a bill');
    }
  };

  $rootScope.forceLogin = function (action) {
    $modal.open({
      templateUrl: 'generalModalContent.html',
      controller: 'GeneralModalCtrl',
      resolve: {
        message: function () {
          return "You've get to log in before " + action + ".";
        }
      }
    }).result.then(function () {
        $scope.logIn();
      });
  };
});
