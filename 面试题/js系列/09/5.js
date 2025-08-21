let parent = {
  name: 'parent',
  like: ['篮球', '足球']
}
function clone(origin) {
  let cloneObj = Object.create(origin)
  cloneObj.getLike = function () {
    return this.like
  }
  return cloneObj
}
let child1 = clone(parent)
let child2 = clone(parent)
child1.like.push('跑步')
console.log(child2.getLike());
