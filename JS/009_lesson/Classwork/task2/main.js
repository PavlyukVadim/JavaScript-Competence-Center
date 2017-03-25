var windowHeight = window.innerHeight;
var scrolled = 0;
var buttonUpElement = document.getElementById('button-up');
var buttonUpTitleElement = document.getElementById('button-up-title');
var SCROLL_TIME = 400; // ms
var acceleration = true;
var isScrolling = false;

buttonUpElement.mode = 'up';


document.addEventListener('scroll', function() {
  scrolled = window.pageYOffset || document.documentElement.scrollTop; 
  if (scrolled >= windowHeight) {
    buttonUpElement.style.display = 'block';
    if (buttonUpElement.mode === 'down' && !isScrolling) {
      changeButtonTitle();
    }
  } else if (scrolled <= windowHeight / 2 && buttonUpElement.mode === 'up' && !isScrolling) {
    buttonUpElement.style.display = 'none';
  }
})


buttonUpElement.addEventListener('click', function() {
  if (isScrolling) return;
  if (buttonUpElement.mode === 'up') {
    this.oldPositionY = scrolled;
    toggleScroll(0, scrolled); 
  }
  else if (buttonUpElement.mode === 'down') {
    toggleScroll(this.oldPositionY, scrolled); 
  }
})


function toggleScroll(to, scrolled) {
  console.log(to, scrolled);
  var distance = Math.abs(to - scrolled);
  var initialDistance = distance;
  var speed = distance / SCROLL_TIME * 10; // pixels/10ms
  var step;
  isScrolling = true;
  if (acceleration) {
    speed = 0;
    step = 2 * distance / Math.pow(SCROLL_TIME, 2) * 10;
    console.log(step);
  }

  var scrollInterval = setInterval(function() {
    distance -= speed;
    
    if (acceleration && distance >= initialDistance / 2) {
      speed += step;
    } else if (acceleration && distance < initialDistance / 2) {
      speed = speed > step * 3 ? speed - step : speed;
    }
    console.log(speed);
    var positionY = scrolled < to ? to - distance : distance;
    window.scrollTo(0, positionY); 
    if (distance <= 0) {
      changeButtonTitle();
      isScrolling = false;
      clearInterval(scrollInterval);
    }
  }, 10);
}

function changeButtonTitle() {
  if (buttonUpElement.mode === 'up') {
    buttonUpTitleElement.innerHTML = ' Вниз ';
    buttonUpElement.className = 'down';
    buttonUpElement.mode = 'down';    
  } else if (buttonUpElement.mode === 'down') {
    buttonUpTitleElement.innerHTML = ' Вверх ';
    buttonUpElement.className = 'up';
    buttonUpElement.mode = 'up';   
  }
}
