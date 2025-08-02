let n = 4;
let bagWeight = 5;
let weight = [1, 2, 3, 4];
let value = [1, 2, 3, 4];

// 完全背包问题 - 二维dp数组
var maxValue = function (n, bagWeight, weight, value) {
    // dp[i][j] 表示考虑前i个物品，背包容量为j时的最大价值
    let dp = Array.from({ length: n }, () => Array(bagWeight + 1).fill(0));
    
    // 初始化第一行：第一个物品可以选择多次
    for (let j = weight[0]; j <= bagWeight; j++) {
        dp[0][j] = dp[0][j - weight[0]] + value[0];
    }
    
    // 填充dp表
    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= bagWeight; j++) {
            if (j < weight[i]) {
                // 放不下第i个物品
                dp[i][j] = dp[i - 1][j];
            } else {
                // 可以放下第i个物品，选择放或不放
                // 注意：这里是dp[i][j - weight[i]]，不是dp[i-1][j - weight[i]]
                // 因为完全背包可以重复选择同一个物品
                dp[i][j] = Math.max(
                    dp[i - 1][j],                    // 不选第i个物品
                    dp[i][j - weight[i]] + value[i]  // 选第i个物品（可重复选择）
                );
            }
        }
    }
    
    return dp[n - 1][bagWeight];
};

// 测试
console.log('二维dp结果:', maxValue(n, bagWeight, weight, value));