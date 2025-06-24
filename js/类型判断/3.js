// let type = Object.prototype.toString.call('a')  // '[object String]'

// console.log(type.slice(8, -1));


// let str = 'hello'
// let s = str.slice(0, 3)
// console.log(s, str);



console.log(Object.prototype.toString.call([]));


// let O = ToObject([])
// let class = O.xxx
// return '[object' + class + ']'





Person.prototype.say = function() {
  console.log('hello', this);
}
function Person() {
  // let obj = {}
  // Person.call(obj)
  // obj.__proto__ = Person.prototype
  this.age = 19
  // return obj
}
Person.run = function(){}


// let p = new Person()
// p.say()
