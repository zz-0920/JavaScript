const arr = [1, 2]

// const obj = {
//   name: '康总',
//   '1': 1
// }
// obj[arr] = '12'

// console.log(obj[arr]);




const m = new Map()
m.set(arr, '12')
// console.log(m.get(arr));
m.delete(arr) 
console.log(m.has(arr));

