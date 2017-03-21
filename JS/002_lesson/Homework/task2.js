'use strict';

function strCount(obj) {
  if (!obj) return 0; 
  let numberOfStr = 0;
  let keys = Object.keys(obj);
  keys.forEach((key) => {
  	if(typeof(obj[key]) === 'string') {
  		numberOfStr += 1;
  	} else if (typeof(obj[key]) === 'object') {
      numberOfStr += strCount(obj[key]);
  	}
  });
  return numberOfStr;
}


console.log(strCount({
  first: '1',
  second: '2',
  third: false,
  fourth: ['anytime',2,3,4],
  fifth:  null,
  sixth:  {a: [['b']]}
}));
