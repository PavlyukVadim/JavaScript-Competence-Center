'use strict';


function smartSum(...args) {
	args = args.map((arg) => arg || 0);
	let prevSum = args.reduce((sum, arg) => sum + arg);
  
  function innerSum(...args) {
  	args = args.map((arg) => arg || 0);
    prevSum += args.reduce((sum, arg) => sum + arg);
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

console.log(+smartSum(1, 2)(3, 4, 5)(6)(7, 10)); // 38
console.log(+smartSum(1, 2, NaN)(3, 4, null, 5)(6)(7, 10)); // 38
