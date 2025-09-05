function flattenObject(obj, prefix = '', result = {}) {
  // 处理null和undefined值
  if (obj === null || obj === undefined) {
    result[prefix] = obj;
    return result;
  }
  
  // 处理非对象类型（直接赋值）
  if (typeof obj !== 'object') {
    result[prefix] = obj;
    return result;
  }
  
  // 处理数组
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const newPrefix = prefix ? `${prefix}[${i}]` : `[${i}]`;
      flattenObject(obj[i], newPrefix, result);
    }
    return result;
  }
  
  // 处理普通对象
  const keys = Object.keys(obj);
  if (keys.length === 0 && prefix) { // 空对象
    result[prefix] = {};
    return result;
  }
  
  for (const key of keys) {
    const value = obj[key];
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    
    // 递归处理嵌套对象
    if (value !== null && typeof value === 'object') {
      flattenObject(value, newPrefix, result);
    } else {
      result[newPrefix] = value;
    }
  }
  
  return result;
}

// 测试用例
const input = {
  a: 1,
  b: [1, 2, {c: true}, [3]],
  d: {e: 2, f: 3},
  g: null
};

console.log(flattenObject(input));
/* 输出:
{
  "a": 1,
  "b[0]": 1,
  "b[1]": 2,
  "b[2].c": true,
  "b[3][0]": 3,
  "d.e": 2,
  "d.f": 3,
  "g": null
}
*/