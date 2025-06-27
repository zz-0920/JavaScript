// setImmediate(() => {
//   console.log('setImmediate')
// })

let a = 1

setTimeout(() => {
  a = 2
  console.log(a)
}, 1000)

console.log(a)