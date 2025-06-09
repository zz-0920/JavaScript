// const obj = {  // 创建了一个对象字面量
//     name : 'zz',
//     age: 18
// }

// // console.log(obj.age);  // 18
// // console.log(obj['age']);  // 18
// obj.sex = 'boy';  // 添加属性
// obj.age = 20;  // 修改属性
// // console.log(obj);  // { name: 'zz', age: 20, sex: 'boy' }
// delete obj.sex;  // 删除属性
// console.log(obj);  // { name: 'zz', age: 20 }

// const n = 1
// n = 2 // 报错，不能修改常量的值
// const a = {
//     b: 1
// }
// a.b = 2 // 可以修改对象的属性值

var obj = {} // 字面量

var obj2 = new Object() // 构造函数

var obj3 = new Person() // 自定义构造函数

function Person() {}