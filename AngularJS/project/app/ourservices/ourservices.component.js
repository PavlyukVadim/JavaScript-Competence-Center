'use strict';

angular.
  module('ourServices').
  component('ourServices', {
  	controllerAs: 'ourServices',
  	controller: ourServicesController,
   templateUrl: 'app/ourservices/ourservices.template.html'
});

function ourServicesController() {
  this.model = ourServicesModel;
  this.selectedTab = ourServicesModel.services[0];
  this.changeService = function(service) {
  	this.selectedTab = service;
  }
}
