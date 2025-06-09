var num = 123  // new Number(123)
num.a = 'aaa'

var s = 'hello'
var n = 123
var n1 = new Number(123)
var b = true
var un = undefined
var nu = null
var sy = Symbol(1)
var big = 123123123n

console.log(typeof n);
console.log(typeof n1);
console.log(typeof(s));
console.log(typeof(b));
console.log(typeof(un));
console.log(typeof(nu)); // object 不能用typeof判断
console.log(typeof(sy));
console.log(typeof(big));

var obj = {}
console.log(typeof obj);