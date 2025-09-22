function add(arr) {
    // 从数组末尾开始处理（个位数开始）
    let carry = 1; // 初始进位为1（因为要加1）
    
    // 从右到左遍历数组
    for (let i = arr.length - 1; i >= 0; i--) {
        let sum = arr[i] + carry;
        arr[i] = sum % 10;  // 当前位的值
        carry = Math.floor(sum / 10);  // 进位
        
        // 如果没有进位了，可以提前结束
        if (carry === 0) {
            break;
        }
    }
    
    // 如果最后还有进位，需要在数组开头添加
    if (carry > 0) {
        arr.unshift(carry);
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