/**
 * 自定义实现 instanceof 操作符
 * 用于检查一个对象的原型链中是否存在某个构造函数的 prototype 属性
 * @param {*} left - 要检查的对象（左操作数）
 * @param {Function} right - 构造函数（右操作数）
 * @returns {boolean} - 如果 left 是 right 的实例则返回 true，否则返回 false
 */
function myInstanceof(left, right) {
    // 首先检查 left 是否为对象类型且不为 null
    // 因为 instanceof 只对对象有意义，基本类型直接返回 false
    if (typeof left !== 'object' || left === null) return false
    
    // 获取 left 对象的原型对象，这是原型链遍历的起点
    // Object.getPrototypeOf() 返回对象的 [[Prototype]] 内部属性
    let proto = Object.getPrototypeOf(left)
    
    // 开始沿着原型链向上查找
    while (true) {
        // 如果原型为 null，说明已经到达原型链的顶端，没有找到匹配
        if (proto === null) return false
        
        // 检查当前原型是否等于构造函数的 prototype 属性
        // 如果相等，说明 left 是 right 的实例
        if (proto === right.prototype) return true
        
        // 继续向上查找，获取当前原型的原型
        proto = Object.getPrototypeOf(proto)
    }
}