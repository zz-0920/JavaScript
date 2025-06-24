let s = '123'
let n = 123
let b = true
let u = undefined
let nul = null
let sym = Symbol()
let big = BigInt(123)
console.log(typeof s) // string
console.log(typeof n) // number
console.log(typeof b) // boolean
console.log(typeof u) // undefined
console.log(typeof nul) // object
console.log(typeof sym) // symbol
console.log(typeof big) // bigint

let obj = {}
let fun = function() {}
let arr = []
let date = new Date()
let set = new Set()
let map = new Map()
console.log(typeof obj) // object
console.log(typeof fun) // function
console.log(typeof arr) // object
console.log(typeof date) // object
console.log(typeof set) // object
console.log(typeof map) // object
