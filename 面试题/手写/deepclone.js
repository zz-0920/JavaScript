function deepClone(obj, hash = new WeakMap()) {
    // 处理 null 和 基本类型 以及 function
    if (obj === null || typeof obj !== "object") {
        if (typeof obj === "function") {
            return cloneFunction(obj);
        }
        return obj;
    }
    
    // 处理循环引用
    if (hash.has(obj)) {
        return hash.get(obj);
    }

    // 处理日期
    if (obj instanceof Date) {
        let newDate = new Date(obj);
        hash.set(obj, newDate);
        return newDate;
    }

    // 处理正则
    if (obj instanceof RegExp) {
        let newReg = new RegExp(obj.source, obj.flags);
        hash.set(obj, newReg);
        return newReg;
    }

    // 处理数组
    if (obj instanceof Array) {
        const newArr = [];
        hash.set(obj, newArr);
        obj.forEach(item => newArr.push(deepClone(item, hash)));
        return newArr;
    }

    // 处理对象
    if (obj instanceof Object) {
        const newObj = {};
        hash.set(obj, newObj);
        Object.keys(obj).forEach(key => {
            newObj[key] = deepClone(obj[key], hash);
        });
        return newObj;
    }

    // 处理 Map
    if (obj instanceof Map) {
        const clone = new Map();
        hash.set(obj, clone);
        obj.forEach((value, key) => {
            clone.set(deepClone(key, hash), deepClone(value, hash));
        });
        return clone;
    }

    // 处理 Set
    if (obj instanceof Set) {
        const clone = new Set();
        hash.set(obj, clone);
        obj.forEach(value => {
            clone.add(deepClone(value, hash));
        });
        return clone;
    }

    // 处理 Error
    if (obj instanceof Error) {
        const clone = new Error(obj.message);
        clone.name = obj.name;
        clone.stack = obj.stack;
        hash.set(obj, clone);
        return clone;
    }
}

// 专门处理函数的克隆
function cloneFunction(fn) {
    // 箭头函数检测
    if (!fn.prototype) {
        return eval(`(${fn.toString()})`);
    }

    // 普通函数处理
    const funcStr = fn.toString();
    const parameters = funcStr.match(/\((.*?)\)/)[1];
    const body = funcStr.match(/\{(.*)\}/s)[1];

    // 使用原型继承保持原型链
    const cloned = new Function(parameters, body);
    cloned.prototype = Object.create(fn.prototype);

    return cloned;
}

// 测试用例
const testObj = {
    name: "测试",
    func1: function (a, b) { return a + b; },
    func2: (x) => x * 2,
    nested: {
        method: function () { return this.name; }
    }
};

const clonedObj = deepClone(testObj);
console.log(clonedObj.func1(2, 3)); // 输出 5
console.log(clonedObj.func2(5));   // 输出 10