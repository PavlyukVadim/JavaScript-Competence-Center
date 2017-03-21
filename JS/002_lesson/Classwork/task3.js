'use strict';

// old version
/*function makeArmy() {
  var shooters = []; 
	for (var i = 0; i< 10; i++) {
	  var shooter = function() { // функция-стрелок
	    console.log(i); // выводит свой номер
	  }; 
	  shooters.push(shooter); 
	} 
  return shooters; 
}


var army = makeArmy(); 
army[0](); // стрелок выводит 10, а должен 0
army[5](); // стрелок выводит 10, а должен 5.
*/

//method #1
/*function makeArmy() {
  const shooters = []; 
	for (let i = 0; i< 10; i++) {
	  const shooter = function() { // функция-стрелок
	    console.log(i); // выводит свой номер
	  }; 
	  shooters.push(shooter); 
	} 
  return shooters; 
}*/


//method #2
function makeArmy() {
  var shooters = []; 
	for (var i = 0; i< 10; i++) {
	  var shooter = (function(i) { // функция-стрелок
	    return function() { 
	      console.log(i); // выводит свой номер 
	    };
	  })(i); 
	  shooters.push(shooter); 
	} 
  return shooters; 
}

var army = makeArmy(); 
army[0](); // стрелок выводит 10, а должен 0
army[5](); // стрелок выводит 10, а должен 5.
