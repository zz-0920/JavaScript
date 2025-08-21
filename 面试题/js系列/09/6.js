Parent.prototype.getName = function(){
  return this.name
}
function Parent() {
  this.name = 'parent'
  this.like = ['篮球', '足球']
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
function Child() {
  Parent.call(this)
  this.age = 18
}

let c1 = new Child()
console.log(c1.getName());
