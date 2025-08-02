var combinationSum4 = function (nums, target) {
    // dp[i] 表示目标和为i的排列数
    let dp = new Array(target + 1).fill(0);
    dp[0] = 1; // 目标和为0有1种方法（什么都不选）
    
    // 外层遍历目标值，内层遍历数组元素（计算排列数）
    for (let j = 1; j <= target; j++) {
        for (let i = 0; i < nums.length; i++) {
            if (j >= nums[i]) { // 确保能放下当前元素
                dp[j] += dp[j - nums[i]];
            }
        }
    }
    
    return dp[target];
};

// 测试用例
console.log(combinationSum4([1, 2, 3], 4)); // 输出: 7
console.log(combinationSum4([9], 3)); // 输出: 0
