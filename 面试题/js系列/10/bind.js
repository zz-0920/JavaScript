Function.prototype.myBind = function(context, ...args) {
  let _this = this
  return function F(...args2) {
    if (this instanceof F) { // 我是不是被 new 了
      return new _this(...args, ...args2)
    } else {
      return _this.apply(context, [...args, ...args2])
    }
  }
}