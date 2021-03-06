'use strict';

class Person {
  
  constructor(firstName = 'John', lastName = 'Doe', age = 0, gender = 'Male') {
    this.firstName = firstName;
    this.lastName =  lastName;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  sayHi() {
    alert('Hello, my  name is ' + this.fullName());
  }
}

class User extends Person {
  
  constructor(firstName = 'John', lastName = 'Doe', age = 0, gender = 'Male', signUpDate = 0, id) {
    super(firstName, lastName, age, gender);
    this.signUpDate= signUpDate;
    this.id = id;
  }
}

let user1 = new User('Вася', 'Lalkin', 22, 'Male', 10, 1);
let user2 = new User('Petya', 'Lalkin', 20, 'Male', 15, 2);
let user3 = new User('Sasha', 'Lalkina', 19, 'Female', 8, 3);
let users = [user1, user2, user3];
alert('open console to inspect users array');
console.log(users);

export {users};
