function foo(str) {
    eval(str)  // var a = 10
    console.log(a, b);  // 10 2
}
var b = 2;
foo('var a = 10');
