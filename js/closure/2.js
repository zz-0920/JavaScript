// function foo(){
//     foo()
// }
// foo()
// Maximum call stack size exceeded

// var a = 2
// function add(){
//     var b = 10
//     return a+b
// }
// add()


// 递归
function runStack(n){
    if(n === 0) return 100
    return runStack(n-2)
}
runStack(5000)