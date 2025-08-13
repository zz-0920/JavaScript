# js面试

---

# 1. js数组上常用的方法有哪些？

## 1. 修改原数组的方法（Mutating Methods）

### 添加/删除元素

**push(element1, element2, ..., elementN)**
- **参数**: 要添加到数组末尾的元素（可变参数）
- **返回值**: 数组的新长度
- **作用**: 将一个或多个元素添加到数组的末尾

**pop()**
- **参数**: 无
- **返回值**: 被删除的元素，如果数组为空则返回undefined
- **作用**: 删除并返回数组的最后一个元素

**unshift(element1, element2, ..., elementN)**
- **参数**: 要添加到数组开头的元素（可变参数）
- **返回值**: 数组的新长度
- **作用**: 将一个或多个元素添加到数组的开头

**shift()**
- **参数**: 无
- **返回值**: 被删除的元素，如果数组为空则返回undefined
- **作用**: 删除并返回数组的第一个元素

**splice(start, deleteCount, item1, item2, ..., itemN)**
- **参数**: 
  - `start`: 开始修改的索引位置
  - `deleteCount`: 要删除的元素个数（可选）
  - `item1, item2, ...`: 要添加的元素（可选）
- **返回值**: 包含被删除元素的数组
- **作用**: 删除、插入或替换数组中的元素

### 排序和反转

**sort(compareFunction)**
- **参数**: `compareFunction` - 比较函数（可选）
  - 格式: `(a, b) => number`
- **返回值**: 排序后的原数组
- **作用**: 对数组元素进行排序

**reverse()**
- **参数**: 无
- **返回值**: 反转后的原数组
- **作用**: 反转数组元素的顺序

### 填充

**fill(value, start, end)**
- **参数**: 
  - `value`: 填充的值
  - `start`: 开始索引（可选，默认0）
  - `end`: 结束索引（可选，默认数组长度）
- **返回值**: 修改后的原数组
- **作用**: 用静态值填充数组的指定范围

## 2. 不修改原数组的方法（Non-mutating Methods）

### 查找和检索

**indexOf(searchElement, fromIndex)**
- **参数**: 
  - `searchElement`: 要查找的元素
  - `fromIndex`: 开始查找的索引（可选，默认0）
- **返回值**: 元素的索引，未找到返回-1
- **作用**: 返回指定元素的第一个索引

**lastIndexOf(searchElement, fromIndex)**
- **参数**: 
  - `searchElement`: 要查找的元素
  - `fromIndex`: 开始查找的索引（可选，默认数组长度-1）
- **返回值**: 元素的索引，未找到返回-1
- **作用**: 返回指定元素的最后一个索引

**includes(searchElement, fromIndex)**
- **参数**: 
  - `searchElement`: 要查找的元素
  - `fromIndex`: 开始查找的索引（可选，默认0）
- **返回值**: boolean值
- **作用**: 判断数组是否包含指定元素

**find(callback, thisArg)**
- **参数**: 
  - `callback`: 测试函数 `(element, index, array) => boolean`
  - `thisArg`: 执行回调时的this值（可选）
- **返回值**: 满足条件的第一个元素，未找到返回undefined
- **作用**: 返回满足测试条件的第一个元素

**findIndex(callback, thisArg)**
- **参数**: 
  - `callback`: 测试函数 `(element, index, array) => boolean`
  - `thisArg`: 执行回调时的this值（可选）
- **返回值**: 满足条件的第一个元素的索引，未找到返回-1
- **作用**: 返回满足测试条件的第一个元素的索引

### 数组转换

**slice(start, end)**
- **参数**: 
  - `start`: 开始索引（可选，默认0）
  - `end`: 结束索引（可选，默认数组长度）
- **返回值**: 新的数组片段
- **作用**: 返回数组的浅拷贝片段

**concat(value1, value2, ..., valueN)**
- **参数**: 要合并的数组或值（可变参数）
- **返回值**: 新的合并数组
- **作用**: 合并两个或多个数组

**join(separator)**
- **参数**: `separator` - 分隔符字符串（可选，默认逗号）
- **返回值**: 连接后的字符串
- **作用**: 将数组元素连接成字符串

### 高阶函数（Higher-order Functions）

**map(callback, thisArg)**
- **参数**: 
  - `callback`: 映射函数 `(element, index, array) => any`
  - `thisArg`: 执行回调时的this值（可选）
- **返回值**: 新数组
- **作用**: 创建新数组，包含对每个元素调用函数的结果

**filter(callback, thisArg)**
- **参数**: 
  - `callback`: 测试函数 `(element, index, array) => boolean`
  - `thisArg`: 执行回调时的this值（可选）
- **返回值**: 新数组
- **作用**: 创建新数组，包含通过测试的所有元素

**reduce(callback, initialValue)**
- **参数**: 
  - `callback`: 累积函数 `(accumulator, currentValue, currentIndex, array) => any`
  - `initialValue`: 初始值（可选）
- **返回值**: 累积结果
- **作用**: 将数组元素累积为单个值

**reduceRight(callback, initialValue)**
- **参数**: 
  - `callback`: 累积函数 `(accumulator, currentValue, currentIndex, array) => any`
  - `initialValue`: 初始值（可选）
- **返回值**: 累积结果
- **作用**: 从右到左执行reduce操作

**forEach(callback, thisArg)**
- **参数**: 
  - `callback`: 执行函数 `(element, index, array) => void`
  - `thisArg`: 执行回调时的this值（可选）
- **返回值**: undefined
- **作用**: 对每个元素执行提供的函数

**some(callback, thisArg)**
- **参数**: 
  - `callback`: 测试函数 `(element, index, array) => boolean`
  - `thisArg`: 执行回调时的this值（可选）
- **返回值**: boolean值
- **作用**: 测试是否至少有一个元素通过测试

**every(callback, thisArg)**
- **参数**: 
  - `callback`: 测试函数 `(element, index, array) => boolean`
  - `thisArg`: 执行回调时的this值（可选）
- **返回值**: boolean值
- **作用**: 测试是否所有元素都通过测试

## 3. ES6+新增方法

**Array.from(arrayLike, mapFn, thisArg)**
- **参数**: 
  - `arrayLike`: 类数组或可迭代对象
  - `mapFn`: 映射函数（可选）
  - `thisArg`: 执行mapFn时的this值（可选）
- **返回值**: 新数组
- **作用**: 从类数组或可迭代对象创建新数组

**Array.of(element0, element1, ..., elementN)**
- **参数**: 任意数量的参数，作为数组元素
- **返回值**: 新数组
- **作用**: 创建具有可变数量参数的新数组

**flat(depth)**
- **参数**: `depth` - 扁平化深度（可选，默认1）
- **返回值**: 新的扁平化数组
- **作用**: 将嵌套数组扁平化

**flatMap(callback, thisArg)**
- **参数**: 
  - `callback`: 映射函数 `(element, index, array) => any`
  - `thisArg`: 执行回调时的this值（可选）
- **返回值**: 新的扁平化数组
- **作用**: 先映射后扁平化（深度为1）

**entries()**
- **参数**: 无
- **返回值**: 新的Array Iterator对象
- **作用**: 返回键值对迭代器

**keys()**
- **参数**: 无
- **返回值**: 新的Array Iterator对象
- **作用**: 返回键的迭代器

**values()**
- **参数**: 无
- **返回值**: 新的Array Iterator对象
- **作用**: 返回值的迭代器

## 4. 使用示例

```javascript
const arr = [1, 2, 3, 4, 5];

// 使用回调函数的方法
const doubled = arr.map((item, index, array) => {
    console.log(`处理第${index}个元素: ${item}`);
    return item * 2;
});

// 使用reduce累积
const sum = arr.reduce((acc, curr, index) => {
    console.log(`第${index}次累积: ${acc} + ${curr}`);
    return acc + curr;
}, 0);

// 使用splice进行复杂操作
const newArr = [...arr]; // 复制数组
newArr.splice(2, 1, 'inserted'); // 从索引2删除1个元素，插入'inserted'
console.log(newArr); // [1, 2, 'inserted', 4, 5]

// 使用高阶函数链式调用
const result = arr
    .filter(x => x > 2)        // [3, 4, 5]
    .map(x => x * 2)           // [6, 8, 10]
    .reduce((a, b) => a + b);  // 24

// 使用迭代器方法
for (const [index, value] of arr.entries()) {
    console.log(`索引${index}: ${value}`);
}
```

## 5. 面试重点

1. **理解修改原数组 vs 不修改原数组的区别**
2. **掌握高阶函数的使用和链式调用**
3. **了解回调函数的参数顺序和含义**
4. **熟悉ES6+新增方法的应用场景**
5. **能够根据需求选择合适的数组方法**

---

# 2. 聊一聊 flat 方法

## 概述

`Array.prototype.flat()` 是 ES2019 (ES10) 引入的数组方法，用于将嵌套的数组"扁平化"为一个新数组。这个方法不会修改原数组，而是返回一个新的扁平化数组。

## 语法

**flat(depth)**
- **参数**: 
  - `depth`: 扁平化深度（可选，默认值为 1）
    - 数字：指定要扁平化的嵌套层数
    - `Infinity`：扁平化所有嵌套层级
- **返回值**: 新的扁平化数组
- **作用**: 将嵌套数组按指定深度扁平化

## 基本用法

### 1. 默认扁平化（深度为1）

```javascript
const arr1 = [1, 2, [3, 4]];
console.log(arr1.flat()); // [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
console.log(arr2.flat()); // [1, 2, 3, 4, [5, 6]]
```

### 2. 指定扁平化深度

```javascript
const arr = [1, 2, [3, 4, [5, 6, [7, 8]]]];

console.log(arr.flat(1)); // [1, 2, 3, 4, [5, 6, [7, 8]]]
console.log(arr.flat(2)); // [1, 2, 3, 4, 5, 6, [7, 8]]
console.log(arr.flat(3)); // [1, 2, 3, 4, 5, 6, 7, 8]
```

### 3. 完全扁平化

```javascript
const deeplyNested = [1, [2, [3, [4, [5]]]]];
console.log(deeplyNested.flat(Infinity)); // [1, 2, 3, 4, 5]
```

### 4. 处理稀疏数组

```javascript
const sparseArray = [1, 2, , 4, [5, , 7]];
console.log(sparseArray.flat()); // [1, 2, 4, 5, 7] - 移除了空槽
```

## 实际应用场景

### 1. 数据处理

```javascript
// 处理嵌套的用户数据
const userGroups = [
    [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}],
    [{id: 3, name: 'Charlie'}],
    [{id: 4, name: 'David'}, {id: 5, name: 'Eve'}]
];

const allUsers = userGroups.flat();
console.log(allUsers);
// [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}, {id: 3, name: 'Charlie'}, {id: 4, name: 'David'}, {id: 5, name: 'Eve'}]
```

### 2. 处理多维数组

```javascript
// 矩阵扁平化
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const flatMatrix = matrix.flat();
console.log(flatMatrix); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 3. 与其他数组方法结合

```javascript
const data = [[1, 2], [3, 4], [5, 6]];

// 扁平化后求和
const sum = data.flat().reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 21

// 扁平化后过滤
const evenNumbers = data.flat().filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]
```

## 手动实现 flat 方法

### 基础实现

```javascript
Array.prototype.myFlat = function(depth = 1) {
    const flatten = (arr, currentDepth) => {
        const result = [];
        
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i]) && currentDepth > 0) {
                result.push(...flatten(arr[i], currentDepth - 1));
            } else {
                result.push(arr[i]);
            }
        }
        
        return result;
    };
    
    return flatten(this, depth);
};

// 测试
const testArr = [1, [2, [3, [4]]], 5];
console.log(testArr.myFlat(2)); // [1, 2, 3, [4], 5]
```

### 支持 Infinity 的实现

```javascript
Array.prototype.myFlatAdvanced = function(depth = 1) {
    const flatten = (arr, currentDepth) => {
        const result = [];
        
        for (let i = 0; i < arr.length; i++) {
            if (arr.hasOwnProperty(i)) { // 处理稀疏数组
                if (Array.isArray(arr[i]) && currentDepth > 0) {
                    result.push(...flatten(arr[i], currentDepth - 1));
                } else {
                    result.push(arr[i]);
                }
            }
        }
        
        return result;
    };
    
    const actualDepth = depth === Infinity ? Number.MAX_SAFE_INTEGER : depth;
    return flatten(this, actualDepth);
};
```

### 迭代实现（避免递归栈溢出）

```javascript
Array.prototype.myFlatIterative = function(depth = 1) {
    let result = [...this];
    let currentDepth = 0;
    
    while (currentDepth < depth) {
        let hasNestedArray = false;
        const newResult = [];
        
        for (let i = 0; i < result.length; i++) {
            if (Array.isArray(result[i])) {
                newResult.push(...result[i]);
                hasNestedArray = true;
            } else {
                newResult.push(result[i]);
            }
        }
        
        result = newResult;
        
        if (!hasNestedArray) break;
        currentDepth++;
    }
    
    return result;
};
```

## 性能考虑

### 1. 深度控制

```javascript
// 避免不必要的深度扁平化
const shallowNested = [1, [2, 3], [4, 5]];

// 好的做法
const result1 = shallowNested.flat(1); // 只需要1层

// 避免过度扁平化
const result2 = shallowNested.flat(Infinity); // 不必要的深度
```

### 2. 大数组处理

```javascript
// 对于大型数组，考虑分批处理
function flattenLargeArray(arr, depth = 1, batchSize = 1000) {
    const result = [];
    
    for (let i = 0; i < arr.length; i += batchSize) {
        const batch = arr.slice(i, i + batchSize);
        result.push(...batch.flat(depth));
    }
    
    return result;
}
```

## 兼容性和替代方案

### 1. 浏览器兼容性

- **支持**: Chrome 69+, Firefox 62+, Safari 12+
- **不支持**: Internet Explorer

### 2. Polyfill 实现

```javascript
if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth = 1) {
        const flatten = (arr, currentDepth) => {
            return currentDepth > 0 ? 
                arr.reduce((acc, val) => 
                    acc.concat(Array.isArray(val) ? 
                        flatten(val, currentDepth - 1) : val), []) : 
                arr.slice();
        };
        
        return flatten(this, depth);
    };
}
```

### 3. 使用 concat 和 apply（ES5 兼容）

```javascript
// 只能扁平化一层
function flattenOneLevel(arr) {
    return [].concat.apply([], arr);
}

// 递归扁平化所有层级
function flattenDeep(arr) {
    return arr.reduce((acc, val) => 
        Array.isArray(val) ? 
            acc.concat(flattenDeep(val)) : 
            acc.concat(val), []);
}
```

## 相关方法对比

### flat vs flatMap

```javascript
const arr = [1, 2, 3];

// flatMap = map + flat(1)
const flatMapResult = arr.flatMap(x => [x, x * 2]);
console.log(flatMapResult); // [1, 2, 2, 4, 3, 6]

// 等价于
const mapFlatResult = arr.map(x => [x, x * 2]).flat();
console.log(mapFlatResult); // [1, 2, 2, 4, 3, 6]
```

### flat vs concat

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

// concat 合并数组
const concatResult = arr1.concat(arr2, arr3);
console.log(concatResult); // [1, 2, 3, 4, 5, 6]

// flat 扁平化嵌套数组
const nestedArr = [arr1, arr2, arr3];
const flatResult = nestedArr.flat();
console.log(flatResult); // [1, 2, 3, 4, 5, 6]
```

## 面试重点

1. **理解扁平化的概念和应用场景**
2. **掌握 depth 参数的使用**
3. **了解稀疏数组的处理方式**
4. **能够手动实现 flat 方法**
5. **理解递归和迭代两种实现方式的优缺点**
6. **了解浏览器兼容性和 polyfill 方案**
7. **掌握与其他数组方法的结合使用**

## 常见面试题

### 1. 实现一个深度扁平化函数

```javascript
function deepFlatten(arr) {
    return arr.reduce((acc, val) => 
        Array.isArray(val) ? 
            acc.concat(deepFlatten(val)) : 
            acc.concat(val), []);
}
```

### 2. 扁平化对象数组

```javascript
function flattenObjectArray(arr) {
    return arr.flat().reduce((acc, obj) => {
        return { ...acc, ...obj };
    }, {});
}

const objArr = [[{a: 1}, {b: 2}], [{c: 3}]];
console.log(flattenObjectArray(objArr)); // {a: 1, b: 2, c: 3}
```

### 3. 性能优化的扁平化

```javascript
function efficientFlat(arr, depth = 1) {
    if (depth <= 0) return arr.slice();
    
    const stack = [...arr.map(item => [item, depth])];
    const result = [];
    
    while (stack.length > 0) {
        const [item, currentDepth] = stack.pop();
        
        if (Array.isArray(item) && currentDepth > 0) {
            stack.push(...item.map(subItem => [subItem, currentDepth - 1]));
        } else {
            result.push(item);
        }
    }
    
    return result.reverse();
}
```

`flat` 方法是现代 JavaScript 中处理嵌套数组的重要工具，理解其原理和实现对于数据处理和算法优化都很有帮助。

---

# 3. 字符串上常见的方法有哪些

## 概述

JavaScript 字符串是不可变的原始数据类型，提供了丰富的方法来处理文本数据。字符串方法可以分为几个主要类别：查找和检索、修改和转换、分割和连接、格式化等。

## 1. 查找和检索方法

### 基础查找

**indexOf(searchValue, fromIndex)**
- **参数**: 
  - `searchValue`: 要搜索的子字符串
  - `fromIndex`: 开始搜索的索引位置（可选，默认0）
- **返回值**: 第一次出现的索引，未找到返回-1
- **作用**: 返回指定子字符串第一次出现的位置

```javascript
const str = "Hello World Hello";
console.log(str.indexOf("Hello")); // 0
console.log(str.indexOf("Hello", 1)); // 12
console.log(str.indexOf("xyz")); // -1
```

**lastIndexOf(searchValue, fromIndex)**
- **参数**: 
  - `searchValue`: 要搜索的子字符串
  - `fromIndex`: 开始搜索的索引位置（可选，默认字符串长度）
- **返回值**: 最后一次出现的索引，未找到返回-1
- **作用**: 返回指定子字符串最后一次出现的位置

```javascript
const str = "Hello World Hello";
console.log(str.lastIndexOf("Hello")); // 12
console.log(str.lastIndexOf("o")); // 14
```

**search(regexp)**
- **参数**: `regexp` - 正则表达式或字符串
- **返回值**: 第一次匹配的索引，未找到返回-1
- **作用**: 使用正则表达式搜索字符串

```javascript
const str = "Hello World 123";
console.log(str.search(/\d+/)); // 12
console.log(str.search("World")); // 6
```

### 现代查找方法（ES6+）

**includes(searchString, position)**
- **参数**: 
  - `searchString`: 要搜索的字符串
  - `position`: 开始搜索的位置（可选，默认0）
- **返回值**: boolean值
- **作用**: 判断字符串是否包含指定子字符串

```javascript
const str = "Hello World";
console.log(str.includes("World")); // true
console.log(str.includes("world")); // false (区分大小写)
console.log(str.includes("Hello", 1)); // false
```

**startsWith(searchString, position)**
- **参数**: 
  - `searchString`: 要搜索的字符串
  - `position`: 开始位置（可选，默认0）
- **返回值**: boolean值
- **作用**: 判断字符串是否以指定字符串开头

```javascript
const str = "Hello World";
console.log(str.startsWith("Hello")); // true
console.log(str.startsWith("World", 6)); // true
```

**endsWith(searchString, length)**
- **参数**: 
  - `searchString`: 要搜索的字符串
  - `length`: 字符串的有效长度（可选）
- **返回值**: boolean值
- **作用**: 判断字符串是否以指定字符串结尾

```javascript
const str = "Hello World";
console.log(str.endsWith("World")); // true
console.log(str.endsWith("Hello", 5)); // true
```

## 2. 提取和截取方法

**charAt(index)**
- **参数**: `index` - 字符的索引位置
- **返回值**: 指定位置的字符，超出范围返回空字符串
- **作用**: 返回指定索引位置的字符

```javascript
const str = "Hello";
console.log(str.charAt(0)); // "H"
console.log(str.charAt(10)); // ""
```

**charCodeAt(index)**
- **参数**: `index` - 字符的索引位置
- **返回值**: 指定位置字符的 Unicode 编码，超出范围返回NaN
- **作用**: 返回指定索引位置字符的 Unicode 编码

```javascript
const str = "Hello";
console.log(str.charCodeAt(0)); // 72 (H的Unicode编码)
console.log(str.charCodeAt(1)); // 101 (e的Unicode编码)
```

**slice(start, end)**
- **参数**: 
  - `start`: 开始索引
  - `end`: 结束索引（不包含，可选）
- **返回值**: 提取的子字符串
- **作用**: 提取字符串的一部分，支持负数索引

```javascript
const str = "Hello World";
console.log(str.slice(0, 5)); // "Hello"
console.log(str.slice(6)); // "World"
console.log(str.slice(-5)); // "World"
console.log(str.slice(-5, -1)); // "Worl"
```

**substring(start, end)**
- **参数**: 
  - `start`: 开始索引
  - `end`: 结束索引（不包含，可选）
- **返回值**: 提取的子字符串
- **作用**: 提取字符串的一部分，不支持负数索引

```javascript
const str = "Hello World";
console.log(str.substring(0, 5)); // "Hello"
console.log(str.substring(6)); // "World"
console.log(str.substring(-1)); // "Hello World" (负数被当作0)
```

**substr(start, length)** ⚠️ 已废弃
- **参数**: 
  - `start`: 开始索引
  - `length`: 提取的字符数（可选）
- **返回值**: 提取的子字符串
- **作用**: 从指定位置开始提取指定长度的字符串

```javascript
const str = "Hello World";
console.log(str.substr(0, 5)); // "Hello"
console.log(str.substr(6, 5)); // "World"
```

## 3. 大小写转换方法

**toLowerCase()**
- **参数**: 无
- **返回值**: 转换为小写的新字符串
- **作用**: 将字符串转换为小写

**toUpperCase()**
- **参数**: 无
- **返回值**: 转换为大写的新字符串
- **作用**: 将字符串转换为大写

**toLocaleLowerCase(locale)**
- **参数**: `locale` - 语言环境（可选）
- **返回值**: 根据本地化规则转换为小写的新字符串
- **作用**: 根据本地化规则将字符串转换为小写

**toLocaleUpperCase(locale)**
- **参数**: `locale` - 语言环境（可选）
- **返回值**: 根据本地化规则转换为大写的新字符串
- **作用**: 根据本地化规则将字符串转换为大写

```javascript
const str = "Hello World";
console.log(str.toLowerCase()); // "hello world"
console.log(str.toUpperCase()); // "HELLO WORLD"

// 土耳其语的特殊情况
const turkish = "İstanbul";
console.log(turkish.toLocaleLowerCase('tr')); // "istanbul"
console.log(turkish.toLowerCase()); // "i̇stanbul"
```

## 4. 去除空白方法

**trim()**
- **参数**: 无
- **返回值**: 去除两端空白字符的新字符串
- **作用**: 去除字符串两端的空白字符

**trimStart() / trimLeft()**
- **参数**: 无
- **返回值**: 去除开头空白字符的新字符串
- **作用**: 去除字符串开头的空白字符

**trimEnd() / trimRight()**
- **参数**: 无
- **返回值**: 去除结尾空白字符的新字符串
- **作用**: 去除字符串结尾的空白字符

```javascript
const str = "  Hello World  ";
console.log(str.trim()); // "Hello World"
console.log(str.trimStart()); // "Hello World  "
console.log(str.trimEnd()); // "  Hello World"
```

## 5. 分割和连接方法

**split(separator, limit)**
- **参数**: 
  - `separator`: 分隔符（字符串或正则表达式）
  - `limit`: 返回数组的最大长度（可选）
- **返回值**: 分割后的字符串数组
- **作用**: 将字符串分割成数组

```javascript
const str = "apple,banana,orange";
console.log(str.split(",")); // ["apple", "banana", "orange"]
console.log(str.split(",", 2)); // ["apple", "banana"]
console.log(str.split("")); // ["a", "p", "p", "l", "e", ",", ...]

// 使用正则表达式
const text = "apple banana orange";
console.log(text.split(/\s+/)); // ["apple", "banana", "orange"]
```

**concat(string2, string3, ..., stringN)**
- **参数**: 要连接的字符串（可变参数）
- **返回值**: 连接后的新字符串
- **作用**: 连接两个或多个字符串

```javascript
const str1 = "Hello";
const str2 = " ";
const str3 = "World";
console.log(str1.concat(str2, str3)); // "Hello World"

// 更常用的方式是使用 + 或模板字符串
console.log(str1 + str2 + str3); // "Hello World"
console.log(`${str1}${str2}${str3}`); // "Hello World"
```

## 6. 替换方法

**replace(searchValue, replaceValue)**
- **参数**: 
  - `searchValue`: 要被替换的字符串或正则表达式
  - `replaceValue`: 替换的字符串或函数
- **返回值**: 替换后的新字符串
- **作用**: 替换字符串中的内容（只替换第一个匹配项）

```javascript
const str = "Hello World Hello";
console.log(str.replace("Hello", "Hi")); // "Hi World Hello"
console.log(str.replace(/Hello/g, "Hi")); // "Hi World Hi"

// 使用函数作为替换值
const result = str.replace(/Hello/g, (match, offset) => {
    return `Hi(${offset})`;
});
console.log(result); // "Hi(0) World Hi(12)"
```

**replaceAll(searchValue, replaceValue)** (ES2021)
- **参数**: 
  - `searchValue`: 要被替换的字符串或全局正则表达式
  - `replaceValue`: 替换的字符串或函数
- **返回值**: 替换后的新字符串
- **作用**: 替换字符串中的所有匹配项

```javascript
const str = "Hello World Hello";
console.log(str.replaceAll("Hello", "Hi")); // "Hi World Hi"
console.log(str.replaceAll(/Hello/g, "Hi")); // "Hi World Hi"
```

## 7. 重复和填充方法

**repeat(count)**
- **参数**: `count` - 重复次数
- **返回值**: 重复指定次数的新字符串
- **作用**: 重复字符串指定次数

```javascript
const str = "Hello";
console.log(str.repeat(3)); // "HelloHelloHello"
console.log("*".repeat(10)); // "**********"
```

**padStart(targetLength, padString)**
- **参数**: 
  - `targetLength`: 目标长度
  - `padString`: 填充字符串（可选，默认空格）
- **返回值**: 填充后的新字符串
- **作用**: 在字符串开头填充字符到指定长度

**padEnd(targetLength, padString)**
- **参数**: 
  - `targetLength`: 目标长度
  - `padString`: 填充字符串（可选，默认空格）
- **返回值**: 填充后的新字符串
- **作用**: 在字符串结尾填充字符到指定长度

```javascript
const str = "5";
console.log(str.padStart(3, "0")); // "005"
console.log(str.padEnd(3, "0")); // "500"

const time = "9:30";
console.log(time.padStart(8, "0")); // "0009:30"
```

## 8. 正则表达式相关方法

**match(regexp)**
- **参数**: `regexp` - 正则表达式
- **返回值**: 匹配结果数组或null
- **作用**: 使用正则表达式匹配字符串

```javascript
const str = "Hello World 123";
console.log(str.match(/\d+/)); // ["123", index: 12, input: "Hello World 123", groups: undefined]
console.log(str.match(/\d+/g)); // ["123"]
console.log(str.match(/xyz/)); // null
```

**matchAll(regexp)** (ES2020)
- **参数**: `regexp` - 全局正则表达式
- **返回值**: 迭代器对象
- **作用**: 返回所有匹配结果的迭代器

```javascript
const str = "Hello 123 World 456";
const matches = str.matchAll(/\d+/g);
for (const match of matches) {
    console.log(match[0]); // "123", "456"
}
```

## 9. Unicode 相关方法

**codePointAt(pos)**
- **参数**: `pos` - 字符位置
- **返回值**: 指定位置字符的 Unicode 码点
- **作用**: 返回指定位置字符的 Unicode 码点

**normalize(form)**
- **参数**: `form` - 标准化形式（"NFC", "NFD", "NFKC", "NFKD"）
- **返回值**: 标准化后的字符串
- **作用**: 按照指定形式标准化 Unicode 字符串

```javascript
const str = "café";
console.log(str.codePointAt(3)); // 233 (é的码点)

// Unicode 标准化
const str1 = "café"; // é 是一个字符
const str2 = "cafe\u0301"; // e + 重音符
console.log(str1 === str2); // false
console.log(str1.normalize() === str2.normalize()); // true
```

## 10. 其他实用方法

**toString()**
- **参数**: 无
- **返回值**: 字符串本身
- **作用**: 返回字符串的原始值

**valueOf()**
- **参数**: 无
- **返回值**: 字符串的原始值
- **作用**: 返回字符串对象的原始值

**localeCompare(that, locales, options)**
- **参数**: 
  - `that`: 要比较的字符串
  - `locales`: 语言环境（可选）
  - `options`: 比较选项（可选）
- **返回值**: 比较结果（-1, 0, 1）
- **作用**: 根据本地化规则比较字符串

```javascript
const str1 = "apple";
const str2 = "banana";
console.log(str1.localeCompare(str2)); // -1 (str1 < str2)
console.log(str2.localeCompare(str1)); // 1 (str2 > str1)
console.log(str1.localeCompare(str1)); // 0 (相等)

// 本地化比较
const german1 = "Äpfel";
const german2 = "Zebra";
console.log(german1.localeCompare(german2, 'de')); // -1
```

## 11. 模板字符串和标签函数

### 模板字符串

```javascript
const name = "World";
const greeting = `Hello, ${name}!`;
console.log(greeting); // "Hello, World!"

// 多行字符串
const multiline = `
    This is a
    multiline string
`;

// 表达式
const a = 5;
const b = 10;
console.log(`Sum: ${a + b}`); // "Sum: 15"
```

### 标签函数

```javascript
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? `<mark>${values[i]}</mark>` : '';
        return result + string + value;
    }, '');
}

const name = "JavaScript";
const type = "language";
const result = highlight`${name} is a programming ${type}.`;
console.log(result); // "<mark>JavaScript</mark> is a programming <mark>language</mark>."
```

## 12. 实际应用场景

### 1. 字符串验证

```javascript
// 邮箱验证
function isValidEmail(email) {
    return email.includes('@') && 
           email.indexOf('@') > 0 && 
           email.lastIndexOf('@') === email.indexOf('@') &&
           email.endsWith('.com') || email.endsWith('.org');
}

// 更严格的验证
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
```

### 2. 字符串格式化

```javascript
// 格式化电话号码
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

console.log(formatPhone('1234567890')); // "(123) 456-7890"
```

### 3. 文本处理

```javascript
// 首字母大写
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// 驼峰命名转换
function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

// 单词计数
function wordCount(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}
```

### 4. 模板引擎简单实现

```javascript
function simpleTemplate(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] || match;
    });
}

const template = "Hello {{name}}, you have {{count}} messages.";
const data = { name: "Alice", count: 5 };
console.log(simpleTemplate(template, data));
// "Hello Alice, you have 5 messages."
```

## 13. 性能考虑

### 1. 字符串连接性能

```javascript
// 低效的方式（大量字符串连接）
let result = "";
for (let i = 0; i < 1000; i++) {
    result += "text" + i; // 每次都创建新字符串
}

// 高效的方式
const parts = [];
for (let i = 0; i < 1000; i++) {
    parts.push("text" + i);
}
const result = parts.join('');

// 最佳方式（现代浏览器）
const result = Array.from({length: 1000}, (_, i) => `text${i}`).join('');
```

### 2. 正则表达式优化

```javascript
// 预编译正则表达式
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmails(emails) {
    return emails.filter(email => emailRegex.test(email));
}

// 避免在循环中创建正则表达式
// 错误方式
for (const email of emails) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // 每次都创建新的正则
        // ...
    }
}
```

## 14. 常见面试题

### 1. 实现字符串反转

```javascript
// 方法1：使用内置方法
function reverse1(str) {
    return str.split('').reverse().join('');
}

// 方法2：循环
function reverse2(str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}

// 方法3：递归
function reverse3(str) {
    if (str.length <= 1) return str;
    return str[str.length - 1] + reverse3(str.slice(0, -1));
}
```

### 2. 判断回文字符串

```javascript
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// 优化版本（不创建新字符串）
function isPalindromeOptimized(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```

### 3. 字符串压缩

```javascript
function compressString(str) {
    if (!str) return str;
    
    let compressed = '';
    let count = 1;
    
    for (let i = 0; i < str.length; i++) {
        if (i + 1 < str.length && str[i] === str[i + 1]) {
            count++;
        } else {
            compressed += str[i] + count;
            count = 1;
        }
    }
    
    return compressed.length < str.length ? compressed : str;
}

console.log(compressString('aabcccccaaa')); // "a2b1c5a3"
```

### 4. 查找最长不重复子串

```javascript
function longestUniqueSubstring(str) {
    let maxLength = 0;
    let start = 0;
    const charMap = new Map();
    
    for (let end = 0; end < str.length; end++) {
        const char = str[end];
        
        if (charMap.has(char) && charMap.get(char) >= start) {
            start = charMap.get(char) + 1;
        }
        
        charMap.set(char, end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}

console.log(longestUniqueSubstring('abcabcbb')); // 3 ("abc")
```

## 15. 面试重点

1. **理解字符串的不可变性**
2. **掌握常用的查找、替换、分割方法**
3. **了解正则表达式在字符串处理中的应用**
4. **熟悉ES6+新增的字符串方法**
5. **理解Unicode和字符编码相关概念**
6. **掌握字符串性能优化技巧**
7. **能够解决常见的字符串算法问题**
8. **了解模板字符串和标签函数的使用**

## 16. 兼容性注意事项

- `includes()`, `startsWith()`, `endsWith()`: ES6+
- `padStart()`, `padEnd()`: ES2017+
- `replaceAll()`: ES2021+
- `matchAll()`: ES2020+
- `trimStart()`, `trimEnd()`: ES2019+

对于需要支持旧浏览器的项目，可以使用相应的 polyfill 或替代方案。

字符串处理是JavaScript开发中的基础技能，熟练掌握这些方法对于文本处理、数据验证、格式化等任务都非常重要。