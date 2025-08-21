// var a = 1

// function foo() {
//   var a = 2
// }
// foo()
// console.log(a);


// if (1) {
//   let a = 1
//   var b = 2
// }
// // console.log(a);
// console.log(b);


var a = 1
function bar() {
  console.log(a);
}
function foo() {
  var a = 2
  bar()
}
foo()