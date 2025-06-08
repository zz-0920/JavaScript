// 暴力枚举(时间复杂度 O(n²))
function maxProfit(prices) {
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            let profit = prices[j] - prices[i];
            maxProfit = Math.max(maxProfit, profit);
        }
    }
    
    return maxProfit;
}

// 一次遍历(时间复杂度 O(n))
function maxProfit(prices) {
    if (prices.length <= 1) return 0;
    
    let minPrice = prices[0];  // 记录到目前为止的最低价格
    let maxProfit = 0;         // 记录最大利润
    
    for (let i = 1; i < prices.length; i++) {
        // 如果今天价格更低，更新最低价格
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            // 否则计算今天卖出的利润，并更新最大利润
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
    }
    
    return maxProfit;
}

// 动态规划思维
function maxProfit(prices) {
    if (prices.length <= 1) return 0;
    
    let minPrice = prices[0];
    let dp = new Array(prices.length).fill(0);
    
    for (let i = 1; i < prices.length; i++) {
        minPrice = Math.min(minPrice, prices[i]);
        dp[i] = Math.max(dp[i-1], prices[i] - minPrice);
    }
    
    return dp[prices.length - 1];
}