var i,
    currentOperation;

var operationBtns = document.querySelectorAll("#operations input[type='button']");
var operationElement = document.getElementById('operation');
var resultElement = document.getElementById('result');
var firstDataInput = document.getElementById('first-data');
var secondDataInput = document.getElementById('second-data');
var resultElement = document.getElementById('result');

for (i = 0; i < operationBtns.length; i++) {
  operationBtns[i].addEventListener('click', function(){
    currentOperation = this.value;
    operationElement.innerHTML = currentOperation;
    resultElement.innerHTML = ' = ' + eval(firstDataInput.value + currentOperation + secondDataInput.value);
  });
}


firstDataInput.addEventListener('change', watchChange);
secondDataInput.addEventListener('change', watchChange);

function watchChange() {
  if (!currentOperation) return;
  resultElement.innerHTML = ' = ' + eval(firstDataInput.value + currentOperation + secondDataInput.value);
}