// 数组  有序的  线性  索引
// const arr = [1,2,3,4,5]
// arr.unshift('hello') // 头部插入hello
// arr.shift() // 头部删除第一个元素
// arr.push('world') // 尾部插入world
// arr.pop() // 尾部删除最后一个元素
// arr.splice(2, 0, 'a') // 在索引2的位置插入a
// arr.splice(2, 1) // 删除索引2的元素
// arr.slice(1, 3) // 截取索引1到3的元素
// arr.indexOf('a') // 查找元素a的索引
// console.log(arr[0]);

const arr = [3, 5, 2, 6, 4]

arr.sort(function (a, b) {
    return a - b
})
console.log(arr);
