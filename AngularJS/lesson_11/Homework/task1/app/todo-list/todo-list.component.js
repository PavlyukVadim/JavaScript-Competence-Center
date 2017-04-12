'use strict';


angular.
  module('todoList').
  component('todoList', {
    templateUrl: 'todo-list/todo-list.template.html',
    controller: function PhoneListController() {
      this.tasks = model;
      
      function addNewTask() {
        this.tasks.push({
          name: this.name,
          date: this.dueDate.getMonth() + '/' +  this.dueDate.getDate() + '/' + this.dueDate.getFullYear(),
          description: this.description,
          completed: this.done || false
        });
      }

      this.addNewTask = addNewTask;
    }
  });
  