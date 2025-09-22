function shallowClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    let newObj = (obj instanceof Array) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

let arr = [1, 2, 3, 4, 5, [1, 2], {a: 1}]
let newArr = shallowClone(arr);
arr[5][1] = 100
console.log(newArr)
