// function foo(){
//     var a = 1
//     var b = a
//     a = 2
//     console.log(a); // 2
//     console.log(b); // 1
// }
// foo()
 function foo(){
     var a = {name:'zs'}
     var b = a
     a.name = 'zz'
     console.log(a); // zz
     console.log(b); // zz
 }
 foo()