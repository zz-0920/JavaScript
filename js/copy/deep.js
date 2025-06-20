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

function deepCopy(obj) {
    let newObj = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { // 判断 key 是不是 obj 显示拥有的
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                newObj[key] = deepCopy(obj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}
let newObj = deepCopy(obj)
obj.like.a = '篮球'
console.log(obj);
console.log(newObj);