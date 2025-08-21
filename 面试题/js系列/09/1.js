function Parent() {
  this.name = 'parent'
  this.like = ['篮球', '足球']
}
Child.prototype = new Parent()
function Child() {
  this.age = 18
}
let c = new Child()
let d = new Child()
c.like.push('跑步')

console.log(d.like);
