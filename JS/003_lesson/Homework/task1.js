'use strict';

function sum(a) {
	let prevSum = a;
  
  function innerSum(a) {
    prevSum += a;
    return innerSum;
  }

  innerSum.valueOf = function() {
  	return prevSum;
  }

  innerSum.toString = function() {
  	return prevSum;
  }

  return innerSum;
}


console.log(sum(1)(2) == 3);
console.log(sum(6)(-1)(-2)(-3) == 0);
console.log(sum(0)(1)(2)(3)(4)(5) == 15);
