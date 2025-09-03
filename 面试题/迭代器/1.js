// Object.prototype[Symbol.iterator] = function() {
//   // let index = 0
//   // let _this = this
//   // return {
//   //   next: function() {
//   //     const arr = Object.values(_this) // [1, 2]

//   //     if (index < arr.length) {
//   //       return {value: arr[index++], done: false }
//   //     } else {
//   //       return {value: undefined, done: true }
//   //     }
//   //   }
//   // }
//   return Object.values(this)[Symbol.iterator]()  // [1, 2]
// }

Object.prototype[Symbol.iterator] = function* () {
  return yield* Object.values(this)
}

let [a , b] = {a: 1, b: 2}
console.log(a, b)


// let obj = {a: 1, b: 2}
// for (let key of obj) {
//   console.log(key)
// }
