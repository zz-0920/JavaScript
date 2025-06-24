const arr = [1, 2, 3, 6, 5, 4]

// let newArr = ['a', 'b', ...arr]
// // newArr = newArr.concat(arr)
// // newArr.push(...arr)
// console.log(newArr);

arr.sort((a, b) => {
  return b - a
})

console.log(arr);

