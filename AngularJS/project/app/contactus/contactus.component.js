'use strict';

angular.
  module('contactUs').
  component('contactUs', {
  	controllerAs: 'contactUs',
  	controller: contactUsController,
    templateUrl: 'app/contactus/contactus.template.html'
});

function contactUsController() {
	this.model = contactUsModel;
	this.submit = function() {
		var messageBody = ['Your name: ' + this.name,
		               'Your mail: ' + this.email,
		               'Your message: ' + this.message].join('\n');
		alert(messageBody);
	}
}