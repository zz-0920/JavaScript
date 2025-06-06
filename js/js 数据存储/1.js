// 基本数据类型
let str = 'hello'  // String
console.log(str[0]); // h
console.log(str.charAt(0)); // h
console.log(str.length); // 5

let num = 12345; // Number
console.log(num); // 12345
console.log(num.toString()); // '12345'
console.log(num.toFixed(2)); // '12345.00'

let bool = true; // Boolean
console.log(bool); // true
console.log(bool.toString()); // 'true'

let un = undefined;

let nul = null;

// 以上都是字面量

// 以下都是构造函数
let str1 = new String('hello'); // String
console.log(str1); // String { 'hello' }
console.log(str1 + ' world');
console.log(str1[0]); // h
console.log(str1.charAt(0)); // h

let num1 = new Number(12345); // Number
console.log(num1); // Number { 12345 }
console.log(num1.toString()); // '12345'
console.log(num1.toFixed(2)); // '12345.00'

let bool1 = new Boolean(true); // Boolean
console.log(bool1); // Boolean { true }
console.log(bool1.toString()); // 'true'

// let un1 = new Undefined(); // 错误的写法
// let nul1 = new Null(); // 错误的写法

let sym = Symbol('hello'); // Symbol
let sym1 = Symbol('hello'); // Symbol
console.log(sym === sym1); // false