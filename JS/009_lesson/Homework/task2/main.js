var discountElement = document.getElementById('discount');
var mouseX;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var prevDistanceOfShift = 0;
var RANDOM_MOVING = true;
var delayOfChangeDirection = 10000;
var direction;
var isCursorMoving = false;

discountElement.style.left = windowWidth / 2 - 30 + 'px';
discountElement.style.top = windowHeight / 2 - 30 + 'px';

if (RANDOM_MOVING) {
  direction = {
    x: 1,
    y: 1
  }
  setInterval(function() {
    var newPositionOfLeft, 
        newPositionOfTop;
    var XYOfShift = {
      x: Math.random() * direction.x / 2,
      y: Math.random() * direction.y / 2,
    }  
    newPositionOfLeft = (parseFloat(discountElement.style.left) || 0) + XYOfShift.x;
    newPositionOfTop = (parseFloat(discountElement.style.top) || 0) + XYOfShift.y;
    if(!isCursorMoving) {
      validDirectionAndChangePos(newPositionOfLeft, newPositionOfTop);
    }
  }, 20);

  setInterval(function() {
    direction = {
      x: Math.random() > 0.5 ? 1 : -1,
      y: Math.random() > 0.5 ? 1 : -1,
    }
  }, delayOfChangeDirection);
}


document.onmousemove = function(e) {
  isCursorMoving = true;
  mouseX = e.pageX;

  var newPositionOfLeft, 
      newPositionOfTop; 
  var equationOfLine = getEquationOfLine(e.pageX, e.pageY);
  var dmns = getElementDimensions(discountElement);
  var distanceFromMouseToElement = calculateDistance(discountElement, e.pageX, e.pageY);
  var distanceOfShift = (1 / (distanceFromMouseToElement / dmns.width)) * 8;
  var XYOfShift = getXYByDistance(dmns.getX(), dmns.getY(), equationOfLine.k, equationOfLine.b, distanceOfShift);
  
  if (prevDistanceOfShift >= distanceOfShift) {
    XYOfShift.x = XYOfShift.y = 0;
  }

  newPositionOfLeft = (parseFloat(discountElement.style.left) || 0) + XYOfShift.x;
  newPositionOfTop = (parseFloat(discountElement.style.top) || 0) + XYOfShift.y;
  validDirectionAndChangePos(newPositionOfLeft, newPositionOfTop); 
  prevDistanceOfShift = distanceOfShift;
  isCursorMoving = false;
}


function validDirectionAndChangePos(left, top) {
  var dmns = getElementDimensions(discountElement);
  left = left || parseFloat(discountElement.style.left);
  top = top ||  parseFloat(discountElement.style.top);
  if (left < 0) {
    direction.x = -2;
    left = windowWidth - dmns.width - 10;
  } else if (left > windowWidth - dmns.width) {
    direction.x = 2;
    left = 10;
  } else if (top < 0) {
    top = windowHeight - dmns.height - 10;
    direction.y = -2;
  } else if (top > windowHeight - dmns.height) {
    top = 10;
    direction.y = 2;
  }
  discountElement.style.left = left + 'px';
  discountElement.style.top = top + 'px';     
}


function calculateDistance(elem, mouseX, mouseY) {
  var dmns = getElementDimensions(elem);
  return Math.floor(Math.sqrt(Math.pow(mouseX - (dmns.getX()), 2) + Math.pow(mouseY - (dmns.getY()), 2)));        
};


function getElementDimensions(elem) {
  return {
    height : elem.clientHeight,
    width : elem.clientWidth,
    left : elem.getBoundingClientRect().left,
    top : elem.getBoundingClientRect().top,
    getX: function() {
      return this.left + this.width / 2;
    },
    getY: function() {
      return this.top + this.height / 2;
    } 
  } 
}


function getEquationOfLine(mouseX, mouseY) {
  var dmns = getElementDimensions(discountElement);
  var k = (mouseY - dmns.getY()) / (mouseX - dmns.getX());
  var b = mouseY - k * mouseX;
  return {
    k: k,
    b: b
  }
}


function getXYByDistance(x2, y2, k, b, distance) {
  var equationA = Math.pow(k, 2) + 1;
  var equationB = 2 * (k *b - k * y2 - x2);
  var equationC = Math.pow(x2, 2) + Math.pow(y2, 2) - 2 * y2 * b + Math.pow(b, 2) - Math.pow(distance, 2);

  var rootOfdiscriminant = Math.sqrt(Math.pow(equationB, 2) - 4 * equationA * equationC);

  var x11 = (-equationB - rootOfdiscriminant) / (2 * equationA);
  var x12 = (-equationB + rootOfdiscriminant) / (2 * equationA);
  var x = mouseX > getElementDimensions(discountElement).getX() ? x11 : x12;
  var y = k * x + b;
  return {
    x: x - x2,
    y: y - y2
  }
}
