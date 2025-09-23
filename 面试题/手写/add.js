function add(arr) {
    let carry = 1

    for (let i = arr.length - 1; i >= 0; i--) {
        let sum = arr[i] + carry
        arr[i] = sum % 10
        carry = Math.floor(sum / 10)

        if (carry === 0) {
            break
        }
    }
    if (carry > 0) {
        arr.unshift(carry)
    }
    return arr;
}

let arr = [2, 4, 6, 3, 5]
console.log('原数组:', arr);
console.log('加1后:', add([...arr])); // 使用展开运算符避免修改原数组

// 测试更多用例
console.log('测试用例:');
console.log('[1, 2, 3] + 1 =', add([1, 2, 3])); // [1, 2, 4]
console.log('[9, 9, 9] + 1 =', add([9, 9, 9])); // [1, 0, 0, 0]
console.log('[1, 9, 9] + 1 =', add([1, 9, 9])); // [2, 0, 0]
console.log('[0] + 1 =', add([0])); // [1]
console.log('[9] + 1 =', add([9])); // [1, 0]