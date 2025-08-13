const arr = ['a', 'b', 'c', 'd']

Array.prototype.my_filter = function (callback) {
    const newArr = []
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) newArr.push(this[i])
    }
    return newArr
}

const res = arr.my_filter((item) => {
    return item !== 'b'
})
console.log(res)