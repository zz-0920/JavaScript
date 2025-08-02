let n = 4;
let bagWeight = 5;
let weight = [1, 2, 3, 4];
let value = [1, 2, 3, 4];

// 完全背包问题 - 一维dp数组优化版本
var maxValueOptimized = function (n, bagWeight, weight, value) {
    // dp[j] 表示背包容量为j时的最大价值
    let dp = Array(bagWeight + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        // 注意：完全背包是正序遍历，0-1背包是逆序遍历
        for (let j = weight[i]; j <= bagWeight; j++) {
            dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
        }
    }
    
    return dp[bagWeight];
};
console.log('一维dp结果:', maxValueOptimized(n, bagWeight, weight, value));