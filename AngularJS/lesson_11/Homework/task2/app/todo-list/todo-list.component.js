'use strict';


angular.
  module('todoList').
  component('todoList', {
    templateUrl: 'todo-list/todo-list.template.html',
    controller: function PhoneListController() {
      this.tasks = model;
      this.editMode = false;

      function addNewTask() {
        this.tasks.push({
          name: this.name,
          date: formatDateToString(this.dueDate || new Date()),
          description: this.description,
          completed: this.done || false
        });
        clearInputs.call(this);
      }

      function formatDateToString(date) {
        return (date.getMonth() + 1) + '/' +  date.getDate() + '/' + date.getFullYear();
      }


      function clearInputs() {
        this.name = '';
        this.dueDate = '';
        this.description = '';
        this.done = '';
      }


      function editTask(task, index) {
        this.editMode = true;
        this.index = index;
        this.name = task.name;
        this.dueDate = new Date(task.date);
        this.description = task.description;
        this.done = task.completed;
      }


      function saveChangesInTask() {
       this.tasks[this.index] = {
          name: this.name,
          date: formatDateToString(this.dueDate || new Date()),
          description: this.description,
          completed: this.done || false
        };
        clearInputs.call(this);
        this.editMode = false;
      }

      this.addNewTask = addNewTask;
      this.editTask = editTask;
      this.saveChangesInTask = saveChangesInTask;

    }
  });
  