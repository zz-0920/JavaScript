var a = 1
function foo() {
    console.log(this.a); // obj.a
}

var obj = {
    a: 2,
    foo: foo
}

var obj2 = {
    a: 3,
    foo: obj
}
obj2.foo.foo()