Object.prototype[Symbol.iterator] = function() {
  // 保存对象引用和属性键，避免每次next调用重新获取
  const obj = this;
  const keys = Object.keys(obj);
  let index = 0;

  return {
    // 使用简洁的箭头函数
    next: () => {
      if (index < keys.length) {
        return { value: obj[keys[index++]], done: false };
      } else {
        // 当done为true时，可省略value属性
        return { done: true };
      }
    }
  };
};


// 优化
Object.prototype[Symbol.iterator] = function() {
  const obj = this;
  // 获取所有属性键，包括Symbol类型
  const keys = Reflect.ownKeys(obj);
  let index = 0;

  return {
    next: () => index < keys.length
      ? { value: obj[keys[index++]], done: false }
      : { done: true }
  };
};