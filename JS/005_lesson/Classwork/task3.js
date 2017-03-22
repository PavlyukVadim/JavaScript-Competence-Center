'use strict';

function getTypeOf(...args) {
  try {
  	if (args.length > 1) throw new Error('Error: Too many arguments');
  }
  catch(e) {
  	console.log(e);
  }
  if (args[0] === null) return 'null';
  return typeof args[0];
}

console.log(getTypeOf(1));
console.log(getTypeOf(null));
console.log(getTypeOf(null, 5));
