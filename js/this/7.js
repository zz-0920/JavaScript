// function a(){
//     let b = function() {
//         let c = () => {
//             let d = () => {
//                 console.log(this); // window
//             }
//             d()
//         }
//         c()
//     }
//     b()
// }
// a()
var a = 1
var obj = {
  a: 2,
  bar: function() {
    const baz = () => {
      console.log(this.a); // 2
    }
    baz()
  }
}
obj.bar()