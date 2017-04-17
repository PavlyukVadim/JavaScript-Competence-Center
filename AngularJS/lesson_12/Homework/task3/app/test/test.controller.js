angular.module('testApp')
       .controller('testController', testController);


function testController($scope) { 
  $scope.model = model; 
  
  $scope.indexOfCurrentQuestion = 1;
  $scope.answers = [];

  $scope.showResult = function() {
  	var numberOfRigthAnswers = this.answers.reduce(function(numberOfRigthAnswers, answer, i) {
      return model.questions[i].indexOfAnswer == answer ? numberOfRigthAnswers + 1 : numberOfRigthAnswers;
  	}, 0)
  	alert('Ваш результат: ' + numberOfRigthAnswers + '/5 !!!');
  }
}
