// 需要给speak 和 identify 两个函数显示传入一个上下文对象

// function identify(context) {
//     return context.name.toUpperCase()
// }
// function speak(context) {
//     var greeting = 'hello, I am ' + identify(context)
//     console.log(greeting);
// }

// var me = {
//     name: 'zz',
// }
// speak(me)  // hello, I am ZZ

function identify() {
    return this.name.toUpperCase()
}
function speak() {
    var greeting = 'hello, I am ' + identify.call(this)
    console.log(greeting);
}

var me = {
    name: 'zz',
}
speak.call(me)  // hello, I am ZZ