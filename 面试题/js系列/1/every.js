const arr = [1, 2, 3, 4, 5]

Array.prototype.my_every = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) continue
        else return false
    }
    return true
}

const res = arr.my_every((item) => {
    return item > 3
})

console.log(res)