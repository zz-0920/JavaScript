let s = '123'
let n = 123
let b = true
let u = undefined
let nul = null
let sym = Symbol()
let big = BigInt(123)


let obj = {}
let fun = function() {}
let arr = []
let date = new Date()
let set = new Set()
let map = new Map()

console.log(arr instanceof Array); // true arr.__proto__ === Array.prototype.__proto__ === Object.prototype
console.log(arr instanceof Object); // true
console.log(set instanceof Set); // true
console.log(map instanceof Map); // true
console.log(date instanceof Date); // true
console.log(fun instanceof Function); // true
console.log(obj instanceof Object); // true

console.log(s instanceof String); // false
console.log(n instanceof Number); // false
console.log(b instanceof Boolean); // false
// console.log(u instanceof Undefined); // 报错
// console.log(nul instanceof Null); // 报错
console.log(sym instanceof Symbol); // false
console.log(big instanceof BigInt); // false