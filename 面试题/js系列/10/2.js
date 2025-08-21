var a = 1
function foo() {
  var a = 2
  console.log(this.a);
}
function bar () {
  var a = 3
  foo()
}
bar()