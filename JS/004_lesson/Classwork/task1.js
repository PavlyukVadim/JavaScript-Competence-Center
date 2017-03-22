'use strict';

function sumArgs() {
  return [].slice.call(arguments).reduce(function(sum, a) {
    return sum + a;
  });  
}

console.log(sumArgs(5, 5, 10));
