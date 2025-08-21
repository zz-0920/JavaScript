Parent.prototype.getName = function(){
  return this.name
}
function Parent() {
  this.name = 'parent'
  this.like = ['篮球', '足球']
}

Child.prototype = new Parent()
Child.prototype.constructor = Child
function Child() {
  Parent.call(this)
  this.age = 18
}

let c = new Child()
console.log(c.constructor);

// let d = new Child()
// d.like.push('跑步')

// console.log(c.like);
// console.log(c.getName());



