window.onload = function() {

  
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
      if (isAutoPlay) {
        clearInterval(autoPlayTimer);
        clearTimeout(createAutoPlayTimer);
      }
      var touchStartX = 0;
      slider.addEventListener('touchstart', function(e) {
        clearInterval(autoPlayTimer);
        var touchobj = e.changedTouches[0];
        touchStartX = parseInt(touchobj.clientX);
        e.preventDefault();
      }, false);
   
      slider.addEventListener('touchmove', function(e) {
        var touchobj = e.changedTouches[0];
        var diff = parseInt(touchobj.clientX) - touchStartX;
        if(isRunning) return;
        slider.style.transform = 'translateX(' + ( - slideWidth * (indexOfCurrentSlide + 1) + diff) + 'px)';
        e.preventDefault();
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
        e.preventDefault();
        createAutoPlayTimer = setTimeout(function () {
          if (isAutoPlay) {
            changeSlide('next');
            autoPlay();
          }
        }, DELAY_AUTOPLAY);
      }, false);  
    }
  })();


};
