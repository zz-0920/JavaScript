const arr = [1, 2, 3, 4]

Array.prototype.my_reduce = function (callback, ...arg) {
    let pre, start = 0;
    arg.length ? pre = arg[0] : (this[0], start = 1);
    for (let i = start; i < this.length; i++) {
        pre = callback(pre, this[i], i, this)
    }
    return pre
}