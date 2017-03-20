'use strict';

function isEmpty(obj) {
  return !Object.keys(obj).length;
}

const obj1 = {};
const obj2 = {
  name: 'Vasya'
};

console.log(isEmpty(obj1));
console.log(isEmpty(obj2));
