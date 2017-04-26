'use strict';

angular.
  module('aboutUs').
  component('aboutUs', {
  	controllerAs: 'aboutUs',
  	controller: aboutUsController,
    templateUrl: 'app/aboutus/aboutus.template.html'
});

function aboutUsController() {
	this.model = aboutUsModel;
}