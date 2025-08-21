const arr = ['a', 'b', 'c', 'd']
// arr.splice(2, 0, 'm')
// console.log(arr);
// const arr2 = arr.concat('e', 'f')
// console.log(arr2);
// arr.splice(2, 1)
// const arr2 = arr.slice(0, 3)
// console.log(arr2);

// arr.splice(1, 1, 'h')
// console.log(arr);

// console.log(arr.includes('aa'));

// console.log(arr.indexOf('aa'));

// const res = arr.find((item, index, array) => {
//   return 1 > 0
// })
// const res = arr.findIndex((item, index, array) => {
//   return item == 'b'
// })
// const res = arr.lastIndexOf('b')
const res = arr.findLastIndex((item, index, array) => {
  return item == 'b'
})
console.log(res);
