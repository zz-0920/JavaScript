function foo(x, y, z) {
  console.log(this.a, x + y + z);
}

let obj = {
  a: 1
}
const baz = foo.bind(obj, 1, 2, 3)
const res = new baz()
console.log(res); // bind 返回的函数体如果被 new 调用的话，得到的是原函数



