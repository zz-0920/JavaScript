const arr = [1, 2, 3, 4]

Array.prototype.my_forEach = function(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this)
  }
}

Array.prototype.myMap = function (callback) {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(callback(this[i], i, this));
  }
  return newArr;
};

Array.prototype.myFilter = function(callback) {
  const res = []
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this) && res.push(this[i])
  }
  return res
}

Array.prototype.myEvery = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false
    }
  }
  return true
}

Array.prototype.myReduce = function(callback, ...arg) {
  let pre, start = 0
  arg.length ? pre = arg[0] : (pre = this[0], start = 1);

  for (let i = start; i < this.length; i++) {
    pre = callback(pre, this[i], i, this)
  }

  return pre
}

const res = arr.myReduce((pre, item, index, array) => {
  return pre + item
}, 0)
console.log(res);

