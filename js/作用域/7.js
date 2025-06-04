// if (true) {
//     let a = 10
//     var b = 20
// }
// console.log(a);

let a = 1
if (true) {
    console.log(a) // 出不去  暂时性死区
    let a = 2 
}
