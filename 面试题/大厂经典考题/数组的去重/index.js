let arr = [1, 3, 2, 4, 2, 3, 1]

function unique(arr) {
    // 借助Set数据结构去重
    // return Array.from(new Set(arr))

    // 借助includes方法去重
    // let res = []
    // for (let i = 0; i < arr.length; i++) {
    //     if (res.includes(arr[i])) {
    //         res.push(arr[i])
    //     }
    // }
    // return res

    // 双指针去重
    arr.sort((a, b) => a - b);
    let right = 1;
    for (let left = 0; left < arr.length; left++) {
        if (arr[right] !== arr[left]) {
            right++
            arr[right] = arr[left]
        }
    }
    return arr.slice(0, right + 1);
}

// 测试代码
console.log('原始数组:', [1, 3, 2, 4, 2, 3, 1]); // sort() => [1, 1, 2, 2, 3, 3, 4]
console.log('去重结果:', unique([1, 3, 2, 4, 2, 3, 1])); // [1, 2, 3, 4]
