'use strict';

const compose = (arg, ...funcs) => funcs.reduce((arg, fn) => fn(arg), arg);


const doubleTheValue = (val) => val * 2;
const addOneToTheValue = (val) => val + 1;

console.log(compose(5, doubleTheValue, addOneToTheValue));
