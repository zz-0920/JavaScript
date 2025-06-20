let obj = {
    name: 'zz',
    age: 18,
    like: {
        a: 'music',
        b:'movie'
    },
    a: undefined,
    b: null,
    c: function() {},
    d: Symbol('123'),
    e: {}
}
let newObj = JSON.parse(JSON.stringify(obj))
obj.like.a = '篮球'
console.log(newObj);
console.log(obj);