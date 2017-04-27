'use strict';

angular.
  module('ourNews').
  component('ourNews', {
  	controllerAs: 'ourNews',
  	controller: ourNewsController,
    templateUrl: 'app/ournews/ournews.template.html'
});

function ourNewsController() {
	this.model = ourNewsModel;
}
  