'use strict';

function func(a, b) {
	console.log('this: ', this);
	console.log('a: ', a);
	console.log('b: ', b);
}

Function.prototype.myCall = function(context, ...args) {
  return this.apply(context, args);
}

func.apply('THIS', [1, 2]);
func.myCall('THIS', 1, 2);
