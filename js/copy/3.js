let obj = {
    name: 'zz',
    age: 18,
    like: {
        a: 'music',
        b:'movie'
    }
}

let newObj = Object.assign({}, obj)
obj.like.a = 'game'
obj.age = 19
console.log(newObj); // { name: 'zz', age: 18, like: { a: 'game', b: 'movie' } }
console.log(obj); // { name: 'zz', age: 19, like: { a: 'game', b: 'movie' } }

let arr = [1, 2, 3, {a: 4}]
let newArr = [].concat(arr)
arr[3].a = 5
console.log(newArr);    // [ 1, 2, 3, { a: 5 } ]