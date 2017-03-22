'use strict';

function printNumber() {
	let counter = 0;
  let interval = setInterval(() => {
    counter++;
  	console.log(counter);
  	if(counter === 20) {
  		clearInterval(interval);
  	}
  }, 100);
}

printNumber();
