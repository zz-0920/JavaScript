const arr = ['a', 'b', 'c', 'd']

// const res = arr.map((item, index, array) => {
//   return item + '1'
// })

// const res = arr.filter((item, index, array) => {
//   return item !== 'c'
// })

const res = arr.myReduce((pre, cur, index, array) => {
  console.log(pre, cur, index);
})

// const res = arr.every((item, index, array) => {
//   console.log(item);
//   return typeof item == 'string'
// })

console.log(res);
