var coinChange = function(coins, amount) {
    // 边界条件
    if (amount === 0) return 0;
    if (coins.length === 0) return -1;
    
    // dp[i] 表示凑成金额i所需的最少硬币数量
    // 初始化为 Infinity，表示无法凑成
    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // 凑成金额0需要0个硬币

    // 外层遍历硬币，内层遍历金额（完全背包求最小值）
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            if (dp[j - coins[i]] !== Infinity) { // 确保前一个状态有效
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
            }
        }
    }
    
    // 如果dp[amount]仍为Infinity，说明无法凑成，返回-1
    return dp[amount] === Infinity ? -1 : dp[amount];
};

// 测试用例
console.log(coinChange([1, 2, 5], 11)); // 输出: 3
console.log(coinChange([2], 3)); // 输出: -1
console.log(coinChange([1], 0)); // 输出: 0