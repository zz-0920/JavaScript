Object.prototype.sex = "男"
let obj = {
    name: 'zz',
    age: 18,
    like: {
        a: 'music',
        b:'movie'
    }
}

function shallowCopy(obj) {
    let newObj = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { // 判断 key 是不是 obj 显示拥有的
            newObj[key] = obj[key]
        }
    }
    return newObj
}
let newObj = shallowCopy(obj)
console.log(newObj);

Object.prototype.d = 4
let o = {
    a: 1,
    b: 2,
    c: 3
}
for (let key in o) {
    console.log(key);
}