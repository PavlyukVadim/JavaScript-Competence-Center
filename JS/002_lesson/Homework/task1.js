'use strict';

function addToPreviousValue() {
	let prevSum = 0;
	return function(a) {
		return prevSum += a;
	};
}

const sum = addToPreviousValue();
console.log(sum(3));
console.log(sum(5));
console.log(sum(228));
