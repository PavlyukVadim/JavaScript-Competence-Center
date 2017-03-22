'use strict';

const leader = {
  name: "Василий Иванович",
  age: 35
};

const leaderJSON = JSON.stringify(leader);
const leaderObj = JSON.parse(leaderJSON);

console.log(leaderJSON);
console.log(leaderObj);
