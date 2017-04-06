window.onload = function() {
  
  var isScrollingViaMenu = false;
  
  
  (function menuComponent() {
    
    var navIcon = document.getElementById('nav-icon');
    var navItems = document.getElementsByClassName('navbar-nav')[0];
    var navbar = document.getElementsByClassName('navbar')[0];
    var isOpenMobileMenu = false;


    navIcon.addEventListener('click', function() {
      navIcon.classList.toggle('open');
      isOpenMobileMenu = !isOpenMobileMenu;
      
      if (isOpenMobileMenu) {
        navItems.style.height = window.innerHeight - navbar.clientHeight + 'px';  
      } else {
        navItems.style.height = 0;  
      }
    });

    navItems.addEventListener('click', function() {
      navIcon.classList.toggle('open');
      isOpenMobileMenu = !isOpenMobileMenu;
      navItems.style.height = 0;  
    });
    
  })();

  
  (function scrollToComponent() {
    
    var navLinks = document.getElementsByClassName('nav-link');
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
    })

    function toggleScroll(to, scrolled) {
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

    prevBtn.addEventListener('click', function() {
      changeSlide('prev');
    });


    nextBtn.addEventListener('click', function() {
      changeSlide('next');
    });


    function changeSlide(mode) {
      if (isRunning) {
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



  (function doYouLikeComponent() {
    var btnScrollToContactUs = document.getElementById('btn-contact-us');
    var SCROLL_TIME = 400;
    var acceleration = true;

    btnScrollToContactUs.addEventListener('click', function() {
      var scrolled = 0 || window.pageYOffset || document.documentElement.scrollTop;
      var contactUsPos = document.getElementById('contact-us').offsetTop;
      toggleScroll(contactUsPos, scrolled);
      console.log(contactUsPos, scrolled);
    });

    function toggleScroll(to, scrolled) {
      var distance = Math.abs(to - scrolled);
      var initialDistance = distance;
      var speed = distance / SCROLL_TIME * 10; // pixels/10ms
      var step;
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
        }
      }, 10);
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
      var diff = scrolled - (statisticsComponent.offsetTop + firstNumber.offsetTop - window.innerHeight);
      scrolled = window.pageYOffset || document.documentElement.scrollTop; 
      isInFieldOfView = (diff > 0 && diff < statisticsComponent.clientHeight - firstNumber.offsetTop + window.innerHeight) //&&
      //console.log(isInFieldOfView);
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



};
