const arr = [1, [2, [3, [4]]]]  // [1, 2, 3, 4]

// console.log(arr.flat(Infinity));

// function flatten(arr) {
//   let res = []
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       res = res.concat(flatten(arr[i]))  // [1, 2, 3, 4]
//     } else {
//       res.push(arr[i])
//     }
//   }

//   return res
// }

// function flatten(arr) {
//   return arr.toString().split(',').map(item => {
//     return +item
//   })
// }

// function flatten(arr) {
//   return arr.reduce((pre, cur) => {  // [1].concat(x)
//     return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
//   }, [])
// }

function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

console.log(flatten(arr));


