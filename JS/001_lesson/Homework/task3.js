'use strict';

function bigToSmallES6(arr) {
  arr.forEach((el) => { arr.push(...arr.shift()); });
  return arr.sort((a, b) => b - a).join('>');
}


function bigToSmall(twoDimensionalArr) {
  var oneDimensionalArr = [];
  twoDimensionalArr.forEach((arr) => {
    arr.forEach((element) => {
      oneDimensionalArr.push(element);
    });
  });
  return oneDimensionalArr.sort((a, b) => b - a).join('>');
}


console.log(bigToSmall([[1, 2], [3, 4], [5, 6]]));
console.log(bigToSmall([[1, 3, 5], [2, 4, 6]]));
console.log(bigToSmall([[1, 1], [1], [1, 1]]));
