var btn = document.getElementById('move-btn');
var inputX = document.getElementById('input-x');
var inputY = document.getElementById('input-y');
var div = document.getElementById('example');

btn.addEventListener('click', function(e) {
  var x = parseFloat(inputX.value);
  var y = parseFloat(inputY.value);

  if(!isNaN(x) && !isNaN(y)) {
    div.style.left = x + 'px';
    div.style.top = y + 'px';
  } else {
    alert('Warning: Invalid data!');
    e.preventDefault();
  }
});
