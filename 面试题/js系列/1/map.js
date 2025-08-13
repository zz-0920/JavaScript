const arr = [1, 2, 3, 4, 5]

Array.prototype.my_map = function (callback) {
    let newArr = []
    for (let i = 0; i < this.length; i++) {
        newArr.push(callback(this[i], i, this))
    }
    return newArr;
}

const newArr = arr.my_map((item) => {
    return item + 1
})

console.log(newArr)