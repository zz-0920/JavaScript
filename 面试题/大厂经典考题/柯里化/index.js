function add(a, b, c) {
    return a + b + c
}

function curryingAdd(a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }
    }
}

console.log(add(1, 2, 3, 4))

console.log(curryingAdd(1)(2)(3))