'use strict';

function joinArgs() {
  return [].slice.call(arguments).join('*');
}

console.log(joinArgs(1, 2, 3));
console.log(joinArgs('hello', 'world', '!'));
