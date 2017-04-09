window.onload = function() {
  
  var isScrollingViaMenu = false;
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

  (function menuComponent() {
    
    var navIcon = document.getElementById('nav-icon');
    var navItems = document.getElementsByClassName('navbar-nav')[0];
    var navbar = document.getElementsByClassName('navbar')[0];
    var isOpenMobileMenu = false;
    var scrolled = 0;

    navIcon.addEventListener('click', function() {
      if (!this.classList.contains('navbar-toggler')) return;
      navIcon.classList.toggle('open');
      isOpenMobileMenu = !isOpenMobileMenu;
      
      if (isOpenMobileMenu) {
        navItems.style.height = window.innerHeight - navbar.clientHeight + 'px';  
      } else {
        navItems.style.height = 0;  
      }
    });

    navItems.addEventListener('click', function() {
      if (!isMobile) return;
      navIcon.classList.toggle('open');
      isOpenMobileMenu = !isOpenMobileMenu;
      navItems.style.height = 0;  
    });

    document.addEventListener('scroll', function() {
      scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (scrolled > 0 && window.innerWidth > 768) {
        navbar.classList.add('navbar-dark');
      } else {
        navbar.classList.remove('navbar-dark');
      }
    })
    
  })();

  
  (function scrollToComponent() {
    
    var navLinks = document.getElementsByClassName('nav-link');
    var navbar = document.getElementsByClassName('navbar')[0];
    var mapOffsetTop = {};
    var i;
    var selector;
    var element;

    var scrolled = 0 || window.pageYOffset || document.documentElement.scrollTop;
    var SCROLL_TIME = 400; // ms
    var acceleration = true;
    var isScrolling = false;
    

    for (i = 0; i < navLinks.length; i++) {
      selector = navLinks[i].dataset.scrollTo;
      element = document.querySelectorAll(selector)[0];
      mapOffsetTop[selector] = element.offsetTop;
      navLinks[i].onclick = (function(i) {
        return function() {
          if (!isScrolling) {
            toggleScroll(mapOffsetTop[navLinks[i].dataset.scrollTo], scrolled);  
          }
        }
      })(i);
    }

    
    document.addEventListener('scroll', function() {
      scrolled = window.pageYOffset || document.documentElement.scrollTop;
    });


    function toggleScroll(to, scrolled) {
      if (!isMobile) {
        to = to - navbar.clientHeight;
      }
      
      var distance = Math.abs(to - scrolled);
      var initialDistance = distance;
      var speed = distance / SCROLL_TIME * 10; // pixels/10ms
      var step;
      isScrolling = true;
      isScrollingViaMenu = true;
      if (acceleration) {
        speed = 0;
        step = 2 * distance / Math.pow(SCROLL_TIME, 2) * 10;
      }
      var scrollInterval = setInterval(function() {
        distance -= speed;
        if (acceleration && distance >= initialDistance / 2) {
          speed += step;
        } else if (acceleration && distance < initialDistance / 2) {
          speed = speed > step * 3 ? speed - step : speed;
        }
        var positionY = scrolled < to ? to - distance : to + distance;
        window.scrollTo(0, positionY); 
        if (distance <= 0) {
          isScrolling = false;
          isScrollingViaMenu = false;
          clearInterval(scrollInterval);
        }
      }, 10);
    }

  })();



  (function mainSliderComponent() {
    var slider = document.getElementById('slider');
    var slides = document.querySelectorAll('#slider .slide');
    var prevBtn = document.getElementById('btn-prev');
    var nextBtn = document.getElementById('btn-next');
    var finger = document.getElementById('finger');
    
    var indexOfCurrentSlide = 0;
    var slideWidth = slides[0].clientWidth;
    var numberOfSlides = slides.length;
    var ANIMATION_DURATION = 1000;
    var isRunning = false;
    var transitionRule = 'transform ' + Number(ANIMATION_DURATION / 1000) + 's'

    var DELAY_AUTOPLAY = 5000;
    var INTERVAL_AUTOPLAY = 3000;
    var isAutoPlay = true;
    var autoPlayTimer;
    var createAutoPlayTimer;
    var scrolled = 0;

    initiateSlider();

    function initiateSlider() {
      slider.style.width = slideWidth * (numberOfSlides + 2) + 'px';
      slider.insertAdjacentElement('beforeEnd', slider.children[0].cloneNode(true));
      slider.insertAdjacentElement('afterBegin', slider.children[2].cloneNode(true));
      slider.style.transform = 'translateX(' + ( - slideWidth) + 'px)';  

      setTimeout(function() {
        slider.style.transition = transitionRule; 
      }, 0);
    }
    
    if (isAutoPlay) {
      autoPlay();
    }


    function autoPlay() {
      autoPlayTimer = setInterval(function() {
        changeSlide('next');        
      }, INTERVAL_AUTOPLAY);
    }
    
    document.addEventListener('scroll', function() {
      scrolled = window.pageYOffset || document.documentElement.scrollTop;
    });
    

    function isSliderInFieldOfView() {
      return scrolled < window.innerHeight;
    }


    prevBtn.addEventListener('click', function() {
      if (isAutoPlay) {
        clearInterval(autoPlayTimer);
        clearTimeout(createAutoPlayTimer);
      }
      changeSlide('prev');
      createAutoPlayTimer = setTimeout(function () {
        if (isAutoPlay) {
          changeSlide('next');
          autoPlay();
        }
      }, DELAY_AUTOPLAY);
    });


    nextBtn.addEventListener('click', function() {
      if (isAutoPlay) {
        clearInterval(autoPlayTimer);
        clearTimeout(createAutoPlayTimer);
      }
      changeSlide('next');
      createAutoPlayTimer = setTimeout(function () {
        if (isAutoPlay) {
          changeSlide('next');
          autoPlay();
        }
      }, DELAY_AUTOPLAY);
    });


    function changeSlide(mode) {
      if (isRunning || !isSliderInFieldOfView()) {
        return;
      } else if ((indexOfCurrentSlide === numberOfSlides - 1) || !indexOfCurrentSlide) {
        slider.style.transition = transitionRule; 
      }

      if (mode === 'prev') {
        if (!indexOfCurrentSlide) {
          setTimeout(function() {
            slider.style.transition = '0s'; 
            slider.style.transform = 'translateX(' + ( -  slideWidth * (numberOfSlides)) + 'px)';
            indexOfCurrentSlide = numberOfSlides - 1; 
          }, ANIMATION_DURATION);
        }
        indexOfCurrentSlide--;
      } else if (mode === 'next') {
        if (indexOfCurrentSlide === numberOfSlides - 1) {
          setTimeout(function() {
            slider.style.transition = '0s'; 
            slider.style.transform = 'translateX(' + ( - slideWidth) + 'px)';
            indexOfCurrentSlide = 0; 
          }, ANIMATION_DURATION);
        }
        indexOfCurrentSlide++;
      }
      
      isRunning = true;
      slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1)) + 'px)';  
      setTimeout(function() {
        isRunning = false;
      }, ANIMATION_DURATION);

    }


    slider.ondragstart = function() {
      return false;
    };

    finger.ondragstart = function() {
      return false;
    };    

    slider.onmousedown = function(e) {
      if (isAutoPlay) {
        clearInterval(autoPlayTimer);
        clearTimeout(createAutoPlayTimer);
      }
      
      var mouseDownX = e.pageX;
      moveSlide(e);
      
      function moveSlide(e) {
        finger.style.display = 'none';
        if (isRunning) return;
        slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1) + e.pageX - mouseDownX) + 'px)';
      }

      document.onmousemove = function(e) {
        moveSlide(e);
      }

      document.onmouseup = function(e) {
        slider.style.transition = transitionRule; 
        var diff = e.pageX - mouseDownX;
        if (diff > 100) {
          changeSlide('prev');
        } else if (diff < -100) {
          changeSlide('next');
        } else {
          slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1)) + 'px)';   
        }
        document.onmousemove = null;
        document.onmouseup = null;
        createAutoPlayTimer = setTimeout(function () {
          if (isAutoPlay) {
            changeSlide('next');
            autoPlay();
          }
        }, DELAY_AUTOPLAY);
      
      }
    }

    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      var touchStartX = 0;
      slider.addEventListener('touchstart', function(e) {
        if (isAutoPlay) {
          clearInterval(autoPlayTimer);
          clearTimeout(createAutoPlayTimer);
        }
        var touchobj = e.changedTouches[0];
        touchStartX = parseInt(touchobj.clientX);
        //e.preventDefault();
      }, false);
   
      slider.addEventListener('touchmove', function(e) {
        var touchobj = e.changedTouches[0];
        var diff = parseInt(touchobj.clientX) - touchStartX;
        finger.style.display = 'none';
        if(isRunning) return;
        slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1) + diff) + 'px)';
        //e.preventDefault();
      }, false);
   
      slider.addEventListener('touchend', function(e) {
        var touchobj = e.changedTouches[0] // reference first touch point for this event
        slider.style.transition = transitionRule; 
        var diff = touchobj.clientX - touchStartX;
        if (diff > 100) {
          changeSlide('prev');
        } else if (diff < -100) {
          changeSlide('next');
        } else {
          slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1)) + 'px)';   
        } 
        //e.preventDefault();
        createAutoPlayTimer = setTimeout(function () {
          if (isAutoPlay) {
            changeSlide('next');
            autoPlay();
          }
        }, DELAY_AUTOPLAY);
      }, false);  
    }
  })();



  (function whatWeLoveComponent() {
    var icons = document.getElementsByClassName('icon');
    var i;

    for (i = 0; i < icons.length; i++) {
      icons[i].addEventListener('mouseover', function() {
        this.style.transform = 'translateX(-50%) translateY(-50%) scale(1.1)';  
        this.style.transition = '.5s';
      }); 
      icons[i].addEventListener('mouseout', function() {
        this.style.transform = 'translateX(-50%) translateY(-50%) scale(1)';  
      });
    }

  })();



  (function portfolioFilterComponent() {
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

  })();



  (function statisticsComponent() {
    var statisticsComponent = document.getElementById('statistics-component');
    var firstNumber = document.querySelectorAll('#statistics-component .type')[0];
    var ANIMATION_DURATION = 3000;
    var isPlayed = false;
    var isInFieldOfView = false;
    var scrolled;

    tryToStart();


    document.addEventListener('scroll', function() {
      tryToStart();      
    });


    function tryToStart() {
      scrolled = window.pageYOffset || document.documentElement.scrollTop; 
      var diff = scrolled - (statisticsComponent.offsetTop + firstNumber.offsetTop - window.innerHeight);
      isInFieldOfView = (diff > 0 && diff < statisticsComponent.clientHeight - firstNumber.offsetTop + window.innerHeight);
      if (isInFieldOfView && !isPlayed && !isScrollingViaMenu) start();
    }


    function start() {
      var countUpElements = document.getElementsByClassName('statistic-count-up'); 
      var i;
      isPlayed = true;

      for (i = 0; i < countUpElements.length; i++) {
        createCountUpForElement(countUpElements[i]);
      }  
    }
    
    
    function createCountUpForElement(countUpElement) {
      var countUpValue = countUpElement.dataset.value;
      var numberOfDigits = countUpValue.length;
      var arrayOfDigitLists = [];
      var animationDuration;
      var i;
      var list;  

      for (i = 0; i < numberOfDigits; i++) {
        list = createDigitList();
        list.style.left = 0.5 * i + 'em';
        list.classList.add('count-up-animate');
        animationDuration = (ANIMATION_DURATION / (countUpValue.slice(0, i + 1)) + 1) / 100;
        if (i >= 2) {
          animationDuration = Math.max(animationDuration, (numberOfDigits - i));
        }
        list.style.animationDuration = animationDuration + 's';
        arrayOfDigitLists.push(list);
        countUpElement.appendChild(list);
      }
      countUpElement.style.width = (numberOfDigits / 2) + 'em';
      
      setTimeout(function() {
        for (i = 0; i < numberOfDigits; i++) {
          arrayOfDigitLists[i].classList.toggle('count-up-animate');
          arrayOfDigitLists[i].innerText = countUpValue[i];  
        }
      }, ANIMATION_DURATION + 200);
    }
    

    function createDigitList() {
      var ul = document.createElement('ul');
      var li;
      var i;

      for (i = 0; i < 10; i++) {
        li = document.createElement('li');
        li.innerHTML = 9 - i;
        ul.appendChild(li);
      }
      ul.classList.add('list-of-digits');
      return ul;
    }

  })();


  
  (function teamComponent() {

    var arrayOfTeamCards = document.getElementsByClassName('team-card');
    var arrayOfDescriptions = document.querySelectorAll('.skill-description .description');
    var skillDescription = document.getElementsByClassName('skill-description')[0]; 
    var teamComponent = document.getElementById('team-component');
    var chartsComponent = document.getElementById('charts-component');
    var firstChart = document.querySelectorAll('.active .chart')[0];
    var charts = document.querySelectorAll('.active .charts')[0];
    
    
    var i, j;
    var target;
    var isPlayed = false;
    var prevActive = arrayOfTeamCards[0];

    var scrolled = 0 || window.pageYOffset || document.documentElement.scrollTop;
    var SCROLL_TIME = 300; // ms
    var acceleration = true;
    var isScrolling = false;
    var prevScrolled = teamComponent.offsetTop + arrayOfTeamCards[0].offsetTop - (window.innerHeight - arrayOfTeamCards[0].clientHeight - skillDescription.clientHeight) + 100;
        prevScrolled = scrolled > prevScrolled ? 0 : prevScrolled;
    var prevPosition = 0;

    arrayOfTeamCards[0].isAnimated = true;
    for (i = 0; i < arrayOfTeamCards.length; i++) {
      (function(i) {
        arrayOfTeamCards[i].addEventListener('click', function(e) {
          
          if (isScrolling) return;
          if (e.target.classList.contains('close-btn')) {
            skillDescription.style.opacity = '0';
            this.classList.remove('active');
            setTimeout(function() {
              skillDescription.parentElement.removeChild(skillDescription);
            }, 400);
            if (!isMobile && prevPosition) {
              setTimeout(function() {           
                toggleScroll(prevPosition, scrolled);
                prevPosition = 0;
              }, 0); 
            }
            return;
          } else if (e.target.tagName !== 'IMG') {
            return;
          }
          prevActive.classList.remove('active');
          prevActive = this;
          target = this.dataset.employee;
          skillDescription.style.opacity = '0';
          this.appendChild(skillDescription);
          
          if (!isMobile) {
            setTimeout(function(that) {
              prevPosition = scrolled;
              toggleScroll(teamComponent.offsetTop + that.offsetTop - (window.innerHeight - that.clientHeight - skillDescription.clientHeight), scrolled);
            }, 0, this);  

            setTimeout(function(that) {
              skillDescription.style.opacity = '1';
              that.classList.add('active');

              if (!that.isAnimated) {
                startAnimateCharts();  
                that.isAnimated = true;
              }

            }, SCROLL_TIME, this);

          } else {
            prevScrolled = teamComponent.offsetTop + this.offsetTop - (window.innerHeight - this.clientHeight - skillDescription.clientHeight);
            console.log('Prevscroled', prevScrolled);
            skillDescription.style.opacity = '1';
            this.classList.add('active');
          }         
                    

          for (j = 0; j < arrayOfDescriptions.length; j++) {
            if (arrayOfDescriptions[j].classList.contains(target)) {
              arrayOfDescriptions[j].classList.add('active');
            } else {
              arrayOfDescriptions[j].classList.remove('active');
            }
          }
          
        }); 
      })(i);
    }

    tryToStartChartsAnimation();

    
    document.addEventListener('scroll', function(e) {
      scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (prevScrolled && !isMobile) {
        if (scrolled > ~~prevScrolled + 25) {
          skillDescription.style.opacity = '0';
          setTimeout(function() {
            skillDescription.parentElement.removeChild(skillDescription);
          }, 400);
          prevActive.classList.remove('active');
          prevScrolled = undefined;
        }
      }
      tryToStartChartsAnimation();
    });


    function tryToStartChartsAnimation() {
      var activeCard = document.querySelectorAll('.team-cards .active')[0];
      scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (!activeCard) return;
      var diff = (scrolled + window.innerHeight - (activeCard.offsetTop + activeCard.clientHeight + chartsComponent.offsetTop + firstChart.offsetTop + 40) - teamComponent.offsetTop);
      isInFieldOfView = (diff > 0 && diff < window.innerHeight - (charts.clientHeight - chartsComponent.offsetTop));
      if (isInFieldOfView && !isPlayed && !isScrollingViaMenu && !isMobile) startAnimateCharts();
    }


    
    function toggleScroll(to, scrolled) {
      var distance = Math.abs(to - scrolled);
      var initialDistance = distance;
      var speed = distance / SCROLL_TIME * 10; // pixels/10ms
      var step;
      if (!scrolled && to < 0 || scrolled === to) return;
      isScrolling = true;
      if (acceleration) {
        speed = 0;
        step = 2 * distance / Math.pow(SCROLL_TIME, 2) * 10;
      }
      var scrollInterval = setInterval(function() {
        distance -= speed;
        if (acceleration && distance >= initialDistance / 2) {
          speed += step;
        } else if (acceleration && distance < initialDistance / 2) {
          speed = speed > step * 3 ? speed - step : speed;
        }
        var positionY = scrolled < to ? to - distance : to + distance;
        window.scrollTo(0, positionY); 
        if (distance <= 0) {
          isScrolling = false;
          clearInterval(scrollInterval);
          if (to > scrolled) {
            prevScrolled = positionY;
          }
        }
      }, 10);
    }

     
    function startAnimateCharts() {
      var canvasElements = document.querySelectorAll('.active .chart-canvas');
      var numberOfPercentsElements = document.querySelectorAll('.active .number-of-percents');
      var percents = [];
      var arrayOfChartComponents = [];
      var i;

      isPlayed = true; 


      function ChartComponent(canvas, percent) {
        this.canvas = canvas;
        this.percent = percent;
      }

      ChartComponent.prototype.circ = Math.PI * 2;
      ChartComponent.prototype.quart = Math.PI / 2;

      ChartComponent.prototype.animate = function(current) {
        var that = this;
        this.canvas.ctx.clearRect(0, 0, 2 * this.canvas.x, 2 * this.canvas.y);
        this.canvas.ctx.beginPath();
        this.canvas.ctx.strokeStyle = '#707070';
        this.canvas.ctx.arc(this.canvas.x, this.canvas.y, this.canvas.radius, 0, this.circ, false);
        this.canvas.ctx.stroke();
        this.canvas.ctx.beginPath();
        this.canvas.ctx.strokeStyle = '#ffe600';
        this.canvas.ctx.arc(this.canvas.x, this.canvas.y, this.canvas.radius, -this.quart, this.circ * current - this.quart, false);
        this.canvas.ctx.stroke();
        this.percent.currentValue += 1;
        this.percent.element.innerText = Math.floor(this.percent.currentValue) + '%'; 
        if (this.percent.currentValue < this.percent.finalValue) {
          requestAnimationFrame(function() {
            that.animate(that.percent.currentValue / 100)
          });
        } 
      }


      function CanvasComponent(canvasElement) {
        this.ctx = canvasElement.getContext('2d');
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#ffe600';
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 3;
        this.ctx.shadowColor = '#656565';
        
        this.x = canvasElement.width / 2;
        this.y = canvasElement.height / 2;
        this.radius = canvasElement.width / 2 - 10;
      }


      function PercentComponent(numberOfPercentsElement) {
        this.currentValue = 0;
        this.finalValue = numberOfPercentsElement.dataset.percentages;
        this.element = numberOfPercentsElement;
      }


      for (i = 0; i < canvasElements.length; i++) {
        var canvasComponent = new CanvasComponent(canvasElements[i]);
        var percentComponent = new PercentComponent(numberOfPercentsElements[i]);
        var chartComponent = new ChartComponent(canvasComponent, percentComponent);
        arrayOfChartComponents.push(chartComponent);
      }

      arrayOfChartComponents.forEach(function(elem) {
        elem.animate(0);
      });

    };

  })();



  (function ourClientsComponent() {
    
    var slider = document.getElementById('cyclic-slider');
    var slides = document.querySelectorAll('#cyclic-slider .slide');
    
    var stylesOfslides = window.getComputedStyle(slides[0]);
    var slideWidth = parseInt(stylesOfslides.width) + 2 * parseInt(stylesOfslides.marginLeft);

    var indexOfCurrentSlide = 0;
    var numberOfSlides = slides.length;
    var ANIMATION_DURATION = 1000;
    var isRunning = false;
    var transitionRule = 'transform ' + Number(ANIMATION_DURATION / 1000) + 's'

    var INTERVAL_AUTOPLAY = 4000;
    var isAutoPlay = true;
    var autoPlayTimer;
    var createAutoPlayTimer;

    initiateSlider();

    function initiateSlider() {
      slider.style.width = slideWidth * (numberOfSlides + 6) + 'px';
      slider.insertAdjacentElement('beforeEnd', slider.children[0].cloneNode(true));
      slider.insertAdjacentElement('beforeEnd', slider.children[1].cloneNode(true));
      slider.insertAdjacentElement('beforeEnd', slider.children[2].cloneNode(true));
      slider.insertAdjacentElement('beforeEnd', slider.children[3].cloneNode(true));
      slider.insertAdjacentElement('beforeEnd', slider.children[4].cloneNode(true));
    }
    
    if (isAutoPlay) {
      autoPlay();
    }

    function autoPlay() {
      autoPlayTimer = setInterval(function() {
        changeSlide('next');
      }, INTERVAL_AUTOPLAY);
    }

    function changeSlide(mode) {
      if (isRunning) {
        return;
      } else if ((indexOfCurrentSlide === numberOfSlides - 1) || !indexOfCurrentSlide) {
        slider.style.transition = transitionRule; 
      }

      if (mode === 'next') {
        if (indexOfCurrentSlide === numberOfSlides - 1) {
          setTimeout(function() {
            slider.style.transition = '1s'; 
            //slider.style.transform = 'translateX(0)';
            indexOfCurrentSlide = 0; 
          }, ANIMATION_DURATION * 1.2);
        }
        indexOfCurrentSlide++;
      }
      
      isRunning = true;
      slider.style.transform = 'translateX(' + ( - slideWidth * indexOfCurrentSlide) + 'px)';  
      setTimeout(function() {
        isRunning = false;
      }, ANIMATION_DURATION);

    }

  })();
  


  (function reviewsComponent() {
    var reviewsEls = document.querySelectorAll('#slider-reviews article');
    var controlRow = document.getElementsByClassName('controlrow')[0];
    var arrayOfControlCircles = [];
    var ANIMATION_DURATION = 1000;
    var indexOfPrevActive = 0;
    var isChanging = 0;
    
    createControlCircles(reviewsEls.length);

    function createControlCircles(number) {
      var i;
      var div;
      for (i = 0; i < number; i++) {
        div = document.createElement('div');
        div.className = 'circle';
        (function(i) {
          div.addEventListener('click', function() {
            if (isChanging || i == indexOfPrevActive) return;
            isChanging = true;
            arrayOfControlCircles[indexOfPrevActive].classList.remove('active');
            this.classList.add('active');
            
            reviewsEls[indexOfPrevActive].classList.add('bounceOut');
            reviewsEls[indexOfPrevActive].classList.remove('bounceIn');

            setTimeout(function(index) {
              reviewsEls[index].classList.remove('active');
              reviewsEls[i].classList.add('active', 'bounceIn');
              reviewsEls[i].classList.remove('bounceOut');
              isChanging = false;
            }, ANIMATION_DURATION, indexOfPrevActive);
            
            indexOfPrevActive = i;
          });
        })(i);
        arrayOfControlCircles.push(div);
        controlRow.appendChild(div);
      }
      arrayOfControlCircles[0].classList.add('active');
    }
  })();



  (function formComponent() {
    var patterns = {
      'email': /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9._]+$/,
      'name': /^[a-zA-Z]+$/,
      'subject': /^[a-zA-Z0-9]+$/
    };

    var inputElements = document.querySelectorAll('#form-component input');
    var tips = document.getElementsByClassName('invalid-value'); 
    var i;
    var isValid;

    for (i = 0; i < inputElements.length; i++) {
      (function(i) {
        inputElements[i].addEventListener('keyup', function() {
          isValid = patterns[this.name].test(this.value);
          this.style.outlineColor = isValid ? '#2e9900' : '#f70c00';
          tips[i].style.display = isValid ? 'none' : 'block'; 
        });
      })(i);
      (function(i) {
        inputElements[i].addEventListener('blur', function() {
          tips[i].style.display = 'none'; 
        });
      })(i);
    }



  })();
};
