function shallowCopy(obj) {
  let newObj = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {  // key 是否是 obj 显示拥有的
      newObj[key] = obj[key]
    }
  }

  return newObj
}