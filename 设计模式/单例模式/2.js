class Point {
    constructor(x, y) { // 构造器函数
        this.x = x
        this.y = y
    }
    toString() {
        return `(${this.x} ,${this.y})`
    }
    static toSum(a, b) {
        return a + b
    }
}

var p = new Point(1, 2)
console.log(p);
console.log(p.toString());
console.log(Point.toSum(1, 2)); // 3
console.log(p.toSum(1, 2)); // 报错
