'use strict';

angular.
  module('achievements').
  component('achievements', {
  	controllerAs: 'achievements',
  	controller: achievementsController,
    templateUrl: 'app/achievements/achievements.template.html'
});

function achievementsController() {
	this.model = achievementsModel;
}