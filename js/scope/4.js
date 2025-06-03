// var obj = { //对象
//     a: 1,
//     b: 2,
//     c: 3,

// }

// with (obj) { // 批量修改对象属性
//     a = 2
//     b = 3
//     c = 4
// }

// console.log(obj['a']);
// console.log(obj.a);
// console.log(obj);

var o1 = {
    a: 1
}
var o2 = {
    b: 2
}
function foo(obj) {
    with(obj) {
        a = 2
    }
}
foo(o2);

console.log(o2);
console.log(o1);
console.log(a);
