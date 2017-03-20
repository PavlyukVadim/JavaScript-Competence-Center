'use strict';

function find(arr, value) {
	//return arr.indexOf(value);
	let i = 0;
	for (; i < arr.length; i++) {
	  if (arr[i] === value) return i;
	}
	return -1;
}
