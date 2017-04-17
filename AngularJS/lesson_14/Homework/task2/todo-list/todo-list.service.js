'use strict';

angular.module('todoList')
       .factory('sendTasks', sendTasks);

function sendTasks() {
	return function($http, data) {
		var dataJson = angular.toJson(data);
    $http.post('site.com', dataJson)
         .then(function(response) {
            console.log("Status: " + response.statusText);
         })
         .catch(function(error) {
            console.error(error.status);
            console.error(error.statusText);
         })
    return dataJson;
	}
}