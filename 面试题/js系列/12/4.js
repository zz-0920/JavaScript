// Object.prototype.toString
// Array.prototype.toString
// 其他

// let fn = function(){}
// console.log(fn.toString());

// Person.prototype.say = function(arr) {
//   console.log('hello', arr);
// }
// function Person() {}
// let p = new Person()
// p.say([])

function type(x) {
  let res = Object.prototype.toString.call(x)
  return res.slice(8, -1)
}

console.log(type(1)); // Number
console.log(type([])); // Array

