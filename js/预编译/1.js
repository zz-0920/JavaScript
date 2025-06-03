// console.log(a)
// var a = 1


// var a = 1
// function fn() {
//     var a = 2
//     function a() {}
//     console.log(a)
// }
// fn()


function fn(a) {
    console.log(a);
    var a = 123
    console.log(a);
    function a() {}
    var b = function() {}
    console.log(b);
    function d() {}
    var d = a
    console.log(d);
}
fn(1)