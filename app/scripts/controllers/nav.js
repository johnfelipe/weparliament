'use district';

app.controller('NavCtrl', function ($scope, Category, Auth, Profile) {
	$scope.categories = Category.all;
	$scope.user = Auth.$getAuth();

	Auth.$onAuth(function(authData) {
	  $scope.user = Auth.$getAuth();
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
});
