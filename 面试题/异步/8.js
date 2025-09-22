function A() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('A')
      resolve()
    }, 1000)
  })
}

function B() {
  console.log('B')
}

function C() {
  console.log('C')
}

function D() {
  console.log('D')
}

// A()
// B()

function* foo(x) {
  yield A()
  yield B()
  yield C()
  yield D()
}

const it = foo()  // it可迭代对象
console.log(it.next());  // { value: Promise { <pending> }, done: false }
console.log(it.next());  // { value: undefined, done: false }
console.log(it.next());  // { value: undefined, done: false }
console.log(it.next());  // { value: undefined, done: false }
console.log(it.next());  // { value: undefined, done: true }
// it.next().value.then((res) => {
//   it.next().value.then(() => {
//     it.next().value.then(() => {
//       it.next()
//     })
//   })
// })

// function* foo(x) {
//   let y = 2 * (yield (x + 1))
//   let z = yield (y / 3)
//   return (x + y + z)
// }
// const it = foo(5)
// console.log(it.next());  // { value: 6, done: false }
// console.log(it.next(12));  // { value: 8, done: false }
// console.log(it.next(13));  // { value: 42, done: true }