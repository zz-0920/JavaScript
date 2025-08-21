Function.prototype.myCall = function(context, ...args) {
  context = context || window
  // this 在调用 myCall
  const fn = Symbol('fn')
  context[fn] = this
  const res = context[fn](...args)  // 隐式绑定
  delete context[fn]
  return res
}


function foo(x, y) {
  console.log(this.a, x + y);
}
let obj = {
  a: 1
}
foo.myCall(obj, 2, 3)