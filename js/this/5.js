function foo(x, y) {
    console.log(this.a, x + y);
}
var obj = {
    a: 1
}
foo.call(obj, 1, 2)
foo.apply(obj, [1, 2])
const bar = foo.bind(obj, 1, 2)
bar()
foo.bind(obj, 1, 2)()