function foo() {
    var myname = '路明非'
    var age = 18

    return function bar() {
        console.log(myname);
    }

}
var baz=foo()
baz()