// 原始类型不能添加属性和方法，属性和方法是对象独有的
// var num = 123  // new Number(123)
// num.a = 'aaa'
// console.log(num.a); // undefined

// var num = new Number(123)
// num.a = 'aaa'
// console.log(num + 1); // 124
// console.log(num.a); // aaa

// var str = 'abc'  // new String('abc')
// console.log(str.length);

// 考点
var arr = [1, 2, 3, 4, 5]
arr.length = 2
console.log(arr);

var str = 'abcd'
str.length = 2
console.log(str);