function currying(fn, ...args) {
  if (args.length < fn.length) {
    return (...args2) => {
      return currying(fn, ...args, ...args2)
    }
  }
  return fn(...args)
}

// function currying(fn) {
//     return function (...args) {
//         if (args.length >= fn.length) {
//             return fn.apply(this, args)
//         } else {
//             return currying(fn.bind(this, ...args))
//         }
//     }
// }

function add(a, b, c, d) {
    return a + b + c + d
}

const addCurrying = currying(add)
console.log(addCurrying(1)(2, 3, 4))