var obj = {
  name: '刘洋',
  age: 18,
  like: ['篮球', '足球'],
  a: undefined,
  b: function() {},
}

function deepClone(obj) { // ['篮球', '足球']
  let res = Array.isArray(obj) ? [] : {}   // ['篮球', '足球']
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        res[key] = deepClone(obj[key])
      } else {
        res[key] = obj[key]
      }
    }
  }
  return res
}

const cloneObj = deepClone(obj)
obj.like.push('跑步')
console.log(cloneObj);
