// let a = 1
// let b = a  // 不叫拷贝

// let obj = {
//     a: 1
// }
// let obj2 = Object.create(obj) // 创建一个新对象，让新对象的隐式原型指向obj
// console.log(obj2.a)

// let arr = [1, 2, 3]
// let arr2 = [4, 5]
// // console.log(arr.concat(arr2))
// // console.log(arr);
// let arr3 = arr.concat()
// console.log(arr3);

// let arr = [1, 2, 3]
// const [x, y, z] = arr
// console.log(x, y, z); // 1 2 3
// console.log(...arr); // 1 2 3
// let arr2 = [...arr]
// console.log(arr2); // [ 1, 2, 3 ]

// let arr = ['a', 'b', 'c', 'd', 'e']
// // arr.splice(1, 1, 'zz') // 会影响原数组
// // console.log(arr); // [ 'a', 'zz', 'c', 'd', 'e' ]
// console.log(arr.slice(0, 2)) // 不会影响原数组
// console.log(arr); // [ 'a', 'b', 'c', 'd', 'e' ]
// console.log(arr.slice())

let obj = {
    name: 'zz',
    age: 18
}
let girl = {
    nickname: 'yy'
}
// let newObj = Object.assign(obj, girl)
// console.log(newObj);
// console.log(obj);
let newObj = Object.assign({}, obj)
console.log(newObj);

let arr = [1, 2, 3]
let newArr = arr.toReversed().reverse()
console.log(newArr); // [ 1, 2, 3 ]
console.log(arr); // [ 1, 2, 3 ]