const arr = [1, [2, [3, [4, [5, [6]]]]]]
const res = arr.flat(Infinity)
console.log(res) // [1, 2, 3, 4, 5, 6]