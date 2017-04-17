'use strict';

angular.module('todoList')
       .controller('todoController', todoController);

function todoController($scope, $http, sendTasks) {
  $scope.model = model;
  $scope.editMode = false;

  function addNewTask() {
    $scope.model.tasks.push({
      name: $scope.name,
      date: $scope.dueDate || new Date(),
      description: $scope.description,
      completed: $scope.done || false
    });
    clearInputs();
    $scope.dataJson = sendTasks($http, $scope.model.tasks);
  }

  function clearInputs() {
    $scope.name = '';
    $scope.dueDate = '';
    $scope.description = '';
    $scope.done = '';
  }

  function editTask(task, index) {
    $scope.editMode = true;
    $scope.index = index;
    $scope.name = task.name;
    $scope.dueDate = new Date(task.date);
    $scope.description = task.description;
    $scope.done = task.completed;
  }

  function saveChangesInTask() {
   $scope.model.tasks[$scope.index] = {
      name: $scope.name,
      date: $scope.dueDate || new Date(),
      description: $scope.description,
      completed: $scope.done || false
    };
    clearInputs();
    $scope.editMode = false;
    $scope.dataJson = sendTasks($http, $scope.model.tasks);
  }

  $scope.addNewTask = addNewTask;
  $scope.editTask = editTask;
  $scope.saveChangesInTask = saveChangesInTask;
}
