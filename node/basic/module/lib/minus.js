function minus(a, b) {
    return a - b
}

exports.minus = minus // 抛出的一定是一个对象

// module.exports = minus // 抛出的是一个函数还是对象，取决于自己的写法