import { add } from './lib.mjs' // { add } === {add: add} 解构

console.log(add(1, 2))

// var obj = {
//     name: 'zz',
//     age: 18
// }
// const {age} = obj
// console.log(age) // 18