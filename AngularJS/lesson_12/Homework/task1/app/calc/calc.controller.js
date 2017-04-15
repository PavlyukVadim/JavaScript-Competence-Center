angular.module("calcApp")
       .controller("calcController", calcController);

function calcController($scope) {
  
  $scope.model = model;
  $scope.model.currOperation = '+';
       
	$scope.model.Pl = function() {
		$scope.model.currOperation = '+';
		$scope.model.currFunction = $scope.model.Pl;
		$scope.model.result = $scope.model.value1 + $scope.model.value2;
	}	

	$scope.model.Mn = function() {
		$scope.model.currOperation = '-';
		$scope.model.currFunction = $scope.model.Mn;
		$scope.model.result = $scope.model.value1 - $scope.model.value2;
	}

	$scope.model.Dv = function() {
		$scope.model.currOperation = '/';
		$scope.model.currFunction = $scope.model.Dv;
		$scope.model.result = $scope.model.value1 / $scope.model.value2;
	}

	$scope.model.Ml = function() {
		$scope.model.currOperation = '*';
		$scope.model.currFunction = $scope.model.Ml;
		$scope.model.result = $scope.model.value1 * $scope.model.value2;
	}

	$scope.model.getResult = function() {
		$scope.model.currFunction();
	}

	$scope.model.currFunction = $scope.model.Pl;
}
