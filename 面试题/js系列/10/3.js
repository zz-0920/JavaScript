var a = 2
function foo() {
  console.log(this.a);
}
let obj = {
  a: 1,
  foo: foo
}
obj.foo()