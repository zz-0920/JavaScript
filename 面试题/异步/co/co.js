const co = require('co')

function asyncFunction(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num)
        }, 1000)
    })
}

function* GeneratorFunction() {
    const result1 = yield asyncFunction(1)
    const result2 = yield asyncFunction(2)
    return result1 + result2
}

co(GeneratorFunction).then(res => {
    console.log(res)
})