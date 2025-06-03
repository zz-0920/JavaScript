var arr = []    // function(){} function(){} function(){}...
// for (var i = 0; i < 5; i++) {
//     function foo(j) {
//         arr.push(function () {  // 被拿到 foo 外面
//         console.log(j);
//     })
//     }
//     foo(i)
// }

(function(j) {
    arr.push(function () {  // 被拿到 foo 外面
        console.log(j);
    })
})(i)


//run
for (var j = 0; j < arr.length; j++) {
    arr[j]()
}



(function(){

})()