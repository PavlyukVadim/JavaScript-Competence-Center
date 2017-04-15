angular.module('selectApp')
       .controller('selectController', selectController);


function selectController($scope) { 
  $scope.model = model;
  $scope.model.mode = model.options[0];
}
