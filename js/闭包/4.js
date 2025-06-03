//  function bar() {
//     console.log(myname)
//  }
//  function foo() {
//     var myname = '路明非'
//     bar();
//  }
//  var myname = '路鸣泽'
//  foo()




function a() {
    var num = 10
    function b() {
        var num = 20
        c()
    }
    function c() {
        console.log(num);
    }
    b()
}
a()