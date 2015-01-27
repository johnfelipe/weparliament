'use strict';

app.controller('LawsCtrl', function ($scope, $stateParams, Law, Category) {
	var categoryId = $stateParams.categoryId;	
	
	if (categoryId){
		$scope.category = Category.get(categoryId);		
		var laws = Law.all();
		$scope.laws = [];
		for (var i = 0;i < laws.length; i++){			
			if (laws[i].Category == categoryId){
				$scope.laws.push(laws[i]);
			}
		}
	}
	else {
		$scope.laws = Law.all();
	}
});
