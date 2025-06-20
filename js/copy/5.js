
let obj = {
    name: 'zz',
    age: 18,
    like: {
        a: 'music',
        b:'movie'
    },
    a: undefined,
    b: null,
//    c: function() {}, // 函数不会拷贝
//    d: Symbol('123'), // 不会拷贝
    e: {}
}
let newObj = structuredClone(obj)
obj.like.a = '篮球'
console.log(newObj);
console.log(obj);