function maxProfit(prices) {
    let dp = new Array(prices.length).fill().map(() => new Array(2).fill(0));
    dp[0][0] = -prices[0]
    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0])
    }
    return dp[prices.length - 1][1]
}