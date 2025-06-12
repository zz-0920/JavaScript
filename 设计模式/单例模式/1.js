function Point(x, y) {
    this.x = x
    this.y = y
}

Point.prototype.toString = function () {
    return `(${this.x} ,${this.y})`
}

Point.toSum = function (a, b) {
    return a + b
}

let p = new Point(1, 2)

console.log(p.toString()); // (1 ,2)
console.log(p.toSum(1, 2)) // 报错
console.log(Point.toSum(1, 2)); // 3
