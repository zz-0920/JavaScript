let arr = [
    { age: 18, name: '张三', like: { r: 'running' } },
    { age: 18, name: '张三', like: { r: 'running' } },
    { age: 20, name: '李四', like: { r: 'running' } },
    { age: 20, name: '王五', like: { r: 'running' } }
]

function unique(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let isExist = false;
        // 优化：如果是基本类型且已存在，直接跳过（减少循环）
        if (!isObject(item)) {
            isExist = res.includes(item);
            // 单独处理NaN（因为includes无法识别NaN）
            if (Number.isNaN(item)) {
                isExist = res.some(x => Number.isNaN(x));
            }
        } else {
            // 对象类型用优化后的equal比较
            for (let j = 0; j < res.length; j++) {
                if (equal(item, res[j])) {
                    isExist = true;
                    break;
                }
            }
        }
        if (!isExist) {
            res.push(item);
        }
    }
    return res;
}

// 工具函数：判断是否为对象（排除null）
function isObject(value) {
    return typeof value === 'object' && value !== null;
}

// 深度比较函数（核心优化）
function equal(obj1, obj2, compared = new WeakMap()) {
    // 1. 基本类型比较（含NaN特殊处理）
    if (!isObject(obj1) || !isObject(obj2)) {
        // 处理NaN：NaN === NaN 为false，但应视为相等
        if (Number.isNaN(obj1) && Number.isNaN(obj2)) return true;
        // 其他基本类型直接严格相等
        return obj1 === obj2;
    }

    // 2. 引用相同的对象（直接相等）
    if (obj1 === obj2) return true;

    // 3. 检测循环引用（避免无限递归）
    if (compared.has(obj1) && compared.get(obj1) === obj2) return true;
    compared.set(obj1, obj2);
    compared.set(obj2, obj1); // 双向记录，避免反向重复比较

    // 4. 特殊对象类型处理
    const type1 = Object.prototype.toString.call(obj1);
    const type2 = Object.prototype.toString.call(obj2);
    // 类型标签不同（如[object Array] vs [object Object]）直接不等
    if (type1 !== type2) return false;

    switch (type1) {
        // 4.1 日期：比较时间戳
        case '[object Date]':
            return obj1.getTime() === obj2.getTime();
        
        // 4.2 正则：比较源模式和修饰符
        case '[object RegExp]':
            return (
                obj1.source === obj2.source &&
                obj1.flags === obj2.flags &&
                obj1.lastIndex === obj2.lastIndex
            );
        
        // 4.3 函数：按引用比较（不同实例即使代码相同也视为不同）
        case '[object Function]':
            return obj1 === obj2;
        
        // 4.4 Map：比较大小和键值对
        case '[object Map]':
            if (obj1.size !== obj2.size) return false;
            for (const [key, val] of obj1) {
                let hasKey = false;
                for (const [key2, val2] of obj2) {
                    if (equal(key, key2, compared) && equal(val, val2, compared)) {
                        hasKey = true;
                        break;
                    }
                }
                if (!hasKey) return false;
            }
            return true;
        
        // 4.5 Set：比较大小和元素
        case '[object Set]':
            if (obj1.size !== obj2.size) return false;
            const arr1 = Array.from(obj1);
            const arr2 = Array.from(obj2);
            for (const item of arr1) {
                if (!arr2.some(x => equal(item, x, compared))) {
                    return false;
                }
            }
            return true;
        
        // 4.6 数组：先比长度，再逐个元素比较
        case '[object Array]':
            if (obj1.length !== obj2.length) return false;
            for (let i = 0; i < obj1.length; i++) {
                if (!equal(obj1[i], obj2[i], compared)) return false;
            }
            return true;
    }

    // 5. 普通对象：比较所有属性（含字符串键、Symbol键、不可枚举键）
    // 获取所有属性键（字符串+Symbol，包括不可枚举）
    const keys1 = [
        ...Object.getOwnPropertyNames(obj1),
        ...Object.getOwnPropertySymbols(obj1)
    ];
    const keys2 = [
        ...Object.getOwnPropertyNames(obj2),
        ...Object.getOwnPropertySymbols(obj2)
    ];

    // 属性数量不同直接不等
    if (keys1.length !== keys2.length) return false;

    // 比较每个属性
    for (const key of keys1) {
        // 检查obj2是否有当前key
        if (!keys2.includes(key)) return false;
        // 递归比较属性值
        if (!equal(obj1[key], obj2[key], compared)) return false;
    }

    return true;
}

console.log(unique(arr));