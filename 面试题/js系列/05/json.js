var obj = {
  name: '刘洋',
  age: 18,
  like: ['篮球', '足球'],
  a: undefined,
  b: null,
  c: function(){},
  e: Symbol(1),
}
obj.f = {}
obj.f.n = obj

const newObj = JSON.parse(JSON.stringify(obj))
obj.like.push('跑步')

console.log(newObj);

