'use strict';

function callFunctionNTimes(func, n) {
  let i = 0;
  while(i < n) {
  	console.log(func.name, func());
  	i++;
  }
  console.log();
}

//method #1
function f1() {
  return f1.numberOfCallsF1++;
}
f1.numberOfCallsF1 = 0;
callFunctionNTimes(f1, 4);

//method #2
function f2() {
	let numberOfCallsF2 = 0;
	return function f2() {
		return numberOfCallsF2++;
	}
}

callFunctionNTimes(f2(), 4);
