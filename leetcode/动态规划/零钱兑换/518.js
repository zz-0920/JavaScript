var change = function (amount, coins) {
    // 边界条件
    if (amount === 0) return 1;
    if (coins.length === 0) return 0;
    
    // dp[j] 表示凑成金额j的组合数
    let dp = new Array(amount + 1).fill(0);
    dp[0] = 1; // 凑成金额0有1种方法

    // 外层遍历硬币，内层遍历金额（确保组合唯一性）
    for (let i = 0; i < coins.length; i++) {
        // 从coins[i]开始遍历，避免无效计算
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] += dp[j - coins[i]];
        }
    }
    
    return dp[amount];
};

// 测试用例
console.log(change(5, [1, 2, 5])); // 4
console.log(change(3, [2])); // 0
console.log(change(10, [10])); // 1
console.log(change(0, [1])); // 1