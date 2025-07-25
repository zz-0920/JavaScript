var maxProfit = function(prices) {
    let max = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i-1]) {
            max += prices[i] - prices[i-1];
        }
    }
    return max;
};