function joinArgs() {
  arguments.join = [].join;
  return arguments.join('*');
}

console.log(joinArgs(1, 2, 3));
console.log(joinArgs('hello', 'world', '!'));
