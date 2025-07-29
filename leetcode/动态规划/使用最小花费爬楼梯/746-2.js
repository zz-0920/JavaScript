var minCostClimbingStairs = function (cost) {
    const memo = new Map();

    function dp(i) {
        // 如果已经到达或超过楼梯顶部，花费为0
        if (i >= cost.length) return 0;

        // 如果已经计算过，直接返回
        if (memo.has(i)) return memo.get(i);

        // 从位置i出发，可以跳1步或2步
        // 需要支付当前位置的费用cost[i]
        const result = cost[i] + Math.min(dp(i + 1), dp(i + 2));
        memo.set(i, result);
        return result;
    }

    // 可以从位置0或位置1开始，选择花费更小的
    return Math.min(dp(0), dp(1));
};