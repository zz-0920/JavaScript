function addBigSum(arr1, arr2) {
    // 开辟新的空间
    // const result = [];
    
    // let i = arr1.length - 1;
    // let j = arr2.length - 1;
    // let carry = 0;

    // while (i >= 0 || j >= 0 || carry) {
    //     let sum = (i >= 0 ? arr1[i] : 0) + (j >= 0 ? arr2[j] : 0) + carry;
    //     result.unshift(sum % 10);
    //     carry = Math.floor(sum / 10);
    //     i--;
    //     j--;
    // }
    
    // return result;

    // 不开辟新的空间
    if (arr1.length < arr2.length) {
        [arr1, arr2] = [arr2, arr1];
    }
    let i = arr1.length - 1;
    let j = arr2.length - 1;
    let carry = 0;
    while (i >= 0) {
        let sum = arr1[i] + (j >= 0 ? arr2[j] : 0) + carry;
        arr1[i] = sum % 10;
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }
    if (carry > 0) {
        arr1.unshift(carry); // 数组头部添加进位
        // arr1 = String(carry) + arr1 // 字符串头部添加进位
    }
    return arr1;
}

// 测试用例
console.log('=== 大数相加测试 ===');

// 基本测试
console.log('123 + 456 =', addBigSum([1, 2, 3], [4, 5, 6])); // [5, 7, 9]

// 不同长度
console.log('999 + 1 =', addBigSum([9, 9, 9], [1])); // [1, 0, 0, 0]

// 有进位
console.log('567 + 789 =', addBigSum([5, 6, 7], [7, 8, 9])); // [1, 3, 5, 6]

// 长度差异很大
console.log('12345 + 67 =', addBigSum([1, 2, 3, 4, 5], [6, 7])); // [1, 2, 4, 1, 2]

// 全是9的情况
console.log('999 + 999 =', addBigSum([9, 9, 9], [9, 9, 9])); // [1, 9, 9, 8]

// 零的情况
console.log('123 + 0 =', addBigSum([1, 2, 3], [0])); // [1, 2, 3]

// 更复杂的例子
console.log('987654321 + 123456789 =', 
    addBigSum([9, 8, 7, 6, 5, 4, 3, 2, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9])); 
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 0]

// 验证函数 - 将数组转换为字符串进行验证（仅用于测试小数）
function arrayToNumber(arr) {
    return parseInt(arr.join(''));
}

// 小数验证
const test1 = [1, 2, 3];
const test2 = [4, 5, 6];
const result = addBigSum(test1, test2);
console.log('验证: 123 + 456 =', arrayToNumber(test1) + arrayToNumber(test2), '结果:', arrayToNumber(result));