var minCostClimbingStairs = function(cost) {
    const n = cost.length;
    // dp 数组：dp[i] 表示从位置 i 到顶部的成本
    const dp = new Array(n + 1);
    dp[n] = 0;        // 顶部，成本为 0
    dp[n - 1] = cost[n - 1];  // 从最后一步直接到顶部
    
    // 从后向前计算 dp[i]
    for (let i = n - 2; i >= 0; i--) {
        dp[i] = cost[i] + Math.min(dp[i + 1], dp[i + 2]);
    }
    
    // 返回从 0 或 1 开始的最小成本
    return Math.min(dp[0], dp[1]);
};