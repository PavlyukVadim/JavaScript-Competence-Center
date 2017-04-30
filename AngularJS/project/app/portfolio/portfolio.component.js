'use strict';

var currentCategory = 'All';

angular.
  module('portfolio').
  filter('category', filterByCategory).
  component('portfolio', {
  	controllerAs: 'portfolio',
  	controller: portfolioController,
    templateUrl: 'app/portfolio/portfolio.template.html'
});

function portfolioController() {
	var ps = this;
	ps.model = portfolioModel;
	ps.selectedTab = 'All';
	ps.changeCategory = changeCategory;
	ps.mouseEnterProject = mouseEnterProject; 
	ps.mouseLeaveProject = mouseLeaveProject; 

	function changeCategory(category) {
		currentCategory = category;
		ps.selectedTab = category;
		console.log(category);
	};

	function mouseEnterProject(project) {
		ps.currentOverProject = project;
	}

	function mouseLeaveProject(project) {
		ps.currentOutProject = project;
	}
}

function filterByCategory() {
  return function (arr) {
  	var i;
    arr =  arr.filter(function(project) {
    	return project.category === currentCategory || currentCategory === 'All';
    });
    return arr; 
	}
}
