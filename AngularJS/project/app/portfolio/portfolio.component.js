'use strict';

angular.
  module('portfolio').
  component('portfolio', {
  	controllerAs: 'portfolio',
  	controller: portfolioController,
    templateUrl: 'app/portfolio/portfolio.template.html'
});

function portfolioController() {
	this.model = portfolioModel;
}

/*(function portfolioFilterComponent() {
    var portfolioFilterElement = document.getElementById('portfolio-filter-component');
    var chooseButtons = document.getElementsByClassName('btn-choose-cat');
    var portfolioTiles = document.getElementsByClassName('tile');
    var descsOfPortfolioTiles = document.getElementsByClassName('work-desc');
    var windowWidth = window.innerWidth;
    var tilesWidth = portfolioTiles[0].clientWidth;
    var tilesHeight = portfolioTiles[0].clientHeight;
    var numberOfTilesInRow = Math.floor(windowWidth / tilesWidth);
    var fillingOfTiles = createArrayOfFillingOfTiles(numberOfTilesInRow, portfolioTiles.length);
    var btnRel;
    var i;
    
    if (isSafari) {
      portfolioFilterElement.style.display = 'none';
    }

    for (i = 0; i < chooseButtons.length; i++) {
      chooseButtons[i].onclick = function() {
        removeClassNameInArrayOfElements(chooseButtons, 'active-btn');
        this.classList.add('active-btn');
        btnRel = this.dataset.rel;
        togglePortfolioTilesByRel(btnRel)
      } 
    }

    for (i = 0; i < portfolioTiles.length; i++) {
      portfolioTiles[i].addEventListener('mouseenter', function() {
        this.classList.remove('mouse-out');
        this.classList.add('mouse-over');
      });
      portfolioTiles[i].addEventListener('mouseleave', function() {
        this.classList.add('mouse-out');
        this.classList.remove('mouse-over');
      });
    }


    function removeClassNameInArrayOfElements(arr, className) {
      var i = 0;
      
      for (i = 0; i < arr.length; i++) {
        arr[i].classList.remove(className);
      }
    }


    function togglePortfolioTilesByRel(className) {
      var i = 0;
      var row = 0, column = 0;
      
      for (i = 0; i < portfolioTiles.length; i++) {
        element = portfolioTiles[i];
        row = Math.floor(i / numberOfTilesInRow);
        column = i % numberOfTilesInRow;
        if (element.classList.contains(className) || className === 'all') {
          element.style.transform = 'translateX(0px) translateY(0px)';
          element.classList.add('zoomIn');
          element.style.zIndex = '999';
          element.classList.remove('zoomOut');
          fillingOfTiles[row][column] = 1;
        } else { 
          element.classList.add('zoomOut');
          element.style.zIndex = '0';
          element.classList.remove('zoomIn');
          fillingOfTiles[row][column] = 0;
        }
      }
      shiftTiles();
    }


    function createArrayOfFillingOfTiles(numberOfTilesInRow, numberOfTiles) {
      var arr = [];
      var numberOfRows = Math.ceil(numberOfTiles / numberOfTilesInRow);
      var i, j;
      
      for (i = 0; i < numberOfRows; i++) {
        arr[i] = [];
        for (j = 0; j < numberOfTilesInRow; j++) {
          arr[i][j] = 0;
        }
      }
      return arr;
    }


    function shiftTiles() {
      var i, j;
      var row;
      var pos;

      for (i = 0; i < fillingOfTiles.length; i++) {
        row = fillingOfTiles[i];
        for (j = 0; j < row.length; j++) {
          pos = getIndexOfNull();
          if (row[j] && pos.y * numberOfTilesInRow + pos.x < i * numberOfTilesInRow + j) {
            portfolioTiles[i * numberOfTilesInRow + j].style.transform = 'translateX(' +  (pos.x - j) * tilesWidth + 'px) translateY(' +  (pos.y - i) * tilesHeight + 'px)';
            fillingOfTiles[pos.y][pos.x] = 1;
            fillingOfTiles[i][j] = 0;
          }
        }
      }
    }


    function getIndexOfNull() {
      var i, j;
      var row;

      for (i = 0; i < fillingOfTiles.length; i++) {
        row = fillingOfTiles[i];
        for (j = 0; j < row.length; j++) {
          if (!row[j]) {
            return {x: j, y: i};
          }
        }
      }
      return {x: Infinity, y: Infinity};  
    }

  })();*/