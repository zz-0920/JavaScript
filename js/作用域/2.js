var a = 10
// console.log(a); // 在全局查找 aa

function foo(b) {
    var a = 1;

    function bar() {
        console.log(a + b);
    }
    bar();
}

foo(2);

