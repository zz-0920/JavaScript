// function foo() {
//     console.log(this); // window
// }
// foo()

// console.log(this); // window

// var obj = {
//     a: this
// }
// console.log(obj.a); // window

{
    let a = this
    console.log(a); // {}
}