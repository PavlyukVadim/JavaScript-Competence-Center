var btn = document.getElementById('btn');

var loginInput = document.getElementById('loginInput');
var passwordInput = document.getElementById('passwordInput');
var phoneInput = document.getElementById('phoneInput');

btn.onclick = function(e) {
	e.preventDefault();
	var loginRegExp = /^\D+$/;
  var passwordRegExp = /^[^\$]+$/;
  var phoneRegExp = /^\d+$/;

  if (!loginRegExp.test(loginInput.value)) {
  	loginInput.style.backgroundColor = '#dd2336';
  } else {
  	loginInput.style.backgroundColor = '#f2f2f2';
  }
  if (!passwordRegExp.test(passwordInput.value)) {
  	passwordInput.style.backgroundColor = '#dd2336';
  } else {
    passwordInput.style.backgroundColor = '#f2f2f2';
  }
  if (!phoneRegExp.test(phoneInput.value)) {
  	phoneInput.style.backgroundColor = '#dd2336';
  } else {
    phoneInput.style.backgroundColor = '#f2f2f2';
  }
}