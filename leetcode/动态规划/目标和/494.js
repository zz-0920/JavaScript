var findTargetSumWays = function(nums, target) {
    let sum = 0;
    nums.forEach(element => {
        sum += element;
    });
    
    // 边界条件检查
    if (Math.abs(target) > sum) return 0;
    if ((sum + target) % 2 === 1) return 0;
    
    const bagSize = (sum + target) / 2;
    
    // dp[j] 表示装满容量为j的背包有多少种方法
    let dp = new Array(bagSize + 1).fill(0);
    dp[0] = 1; // 装满容量为0的背包有1种方法（什么都不装）
    
    for (let i = 0; i < nums.length; i++) {
        for (let j = bagSize; j >= nums[i]; j--) {
            dp[j] += dp[j - nums[i]];
        }
    }
    
    return dp[bagSize];
};

// 测试
let nums = [1, 1, 1, 1, 1];
let target = 3;
console.log(findTargetSumWays(nums, target)); // 输出: 5