// function identify(context) {
//   return context.name.toUpperCase()
// }

// function speek(context) {
//   var greeting = 'hello, I am ' + identify(context)
//   console.log(greeting);
// }

// var me = {
//   name: 'Tom'
// }
// speek(me)  



function identify() {
  return this.name.toUpperCase()
}

function speek() {
  var greeting = 'hello, I am ' + identify.call(this)
  console.log(greeting);
}

var me = {
  name: 'Tom'
}
speek.call(me)  