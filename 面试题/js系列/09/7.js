// function Parent() {
//   this.name = 'parent'
//   this.like = ['篮球', '足球']
// }
// Parent.prototype.getName = function () {
//   return this.name
// }
// Parent.say = function () {
//   return 'hello'
// }

// const arr = []
// console.log(Array.isArray(arr));
// console.log(arr.isArray());







class Parent {
  constructor() {
    this.name = 'parent'
    this.like = ['篮球', '足球']
  }
  getName() {
    return this.name
  }
  static say () {
    return 'hello'
  }
}
class Child extends Parent {
  constructor() {
    super()
    this.age = 18
  }
}

let c = new Child()
console.log(c.getName());