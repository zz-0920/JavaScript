var obj = {
  name: '刘洋',
  age: 18,
  like: ['篮球', '足球'],
  a: undefined,
  b: null,
}
obj.f = {}
obj.f.n = obj

const newObj = structuredClone(obj)
obj.like.push('跑步')
console.log(newObj);
