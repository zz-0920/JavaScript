const arr = ['a', 'b', 'c', 'd']

Array.prototype.my_forEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this)
  }
}