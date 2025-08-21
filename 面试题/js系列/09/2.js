Parent.prototype.getName = function(){
  return this.name
}
function Parent() {
  this.name = 'parent'
  this.like = ['篮球', '足球']
}

function Child() {
  this.age = 18
  Parent.call(this)
  // this.name = 'parent'
  // this.like = ['篮球', '足球']
}

let c = new Child()
console.log(c.getName());

// let d = new Child()
// c.like.push('跑步')
// console.log(d.like);
