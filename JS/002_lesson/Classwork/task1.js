/*1. Ні, глобальна змінна value не змінниться. Це пов'язано з hoisting.
аналогічний код
var value = 0;
function f() {
  var value;
  if (1) {
    value = true;
  } else {
    value = false;
  }
  alert( value );
}
f();
Якщо забрати var - функція буде використовувати зовнішню value. Змінить її на true.*/