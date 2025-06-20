# 面试题：请你手写一个深浅拷贝函数

# v8是如何存储数据的
1. 栈内存：存储小数据，比如基本数据类型，引用数据类型的地址
2. 堆内存：存储引用数据类型

# 拷贝
- 复刻一个对象，和原对象长得一样

- 浅拷贝:只拷贝对象的最外层，原对象的属性值修改会影响新对象
1. Object.create()
2. [].concat(arr)
3. ...arr // 数组的解构
4. arr.slice()
5. Object.assign()
6. arr.toReversed().reverse()

- 深拷贝:层层拷贝，新对象不受原对象的影响
1. JSON.parse(JSON.stringify(obj))
  - 无法识别 bigint 类型，无法处理 undefined，symbol，函数
  - 无法处理循环引用
2. structuredClone()
