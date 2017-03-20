'use strict';


function bubbleSort(arr) {
  let ordered = 0;
  while (ordered < arr.length) {
    let i = 0;
    while (i < arr.length - ordered - 1) {
      if (arr[i] > arr[i + 1]) {
        const tempElement = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tempElement;
      }
      i++;
    }
    ordered++;
  }
  return arr;
}

const arr = [1, 90, 789, 56, 45, 34, 678, 78, -90, -6, 5, 3, 6];

console.log(bubbleSort(arr));
