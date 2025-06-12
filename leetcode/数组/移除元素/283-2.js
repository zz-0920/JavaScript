/**
 * 优化版本：减少不必要的赋值操作
 * @param {number[]} nums
 * @return {void}
 */
var moveZeroesOptimized = function(nums) {
    let slow = 0;
    
    // 第一遍：将所有非零元素移到前面
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            // 只有当slow和fast不同时才进行交换，减少不必要的操作
            if (slow !== fast) {
                // 使用交换而不是覆盖，可以减少一次循环
                [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            }
            slow++;
        }
    }
};

// 测试优化版本
console.log('\n=== 优化版本测试 ===');
let nums5 = [0, 1, 0, 3, 12];
console.log('输入:', JSON.stringify(nums5));
moveZeroesOptimized(nums5);
console.log('输出:', JSON.stringify(nums5));