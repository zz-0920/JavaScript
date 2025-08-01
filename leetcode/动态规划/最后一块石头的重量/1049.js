var lastStoneWeightII = function (stones) {
    // 计算总重量
    let sum = 0;
    stones.forEach(element => {
        sum += element;
    });
    
    const target = Math.floor(sum / 2);
    
    // dp[j] 表示容量为j的背包能装的最大重量
    let dp = new Array(target + 1).fill(0);
    
    for (let i = 0; i < stones.length; i++) {
        for (let j = target; j >= stones[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i]);
        }
    }
    
    // 一堆的重量是dp[target]，另一堆是sum - dp[target]
    // 最后剩余重量 = |dp[target] - (sum - dp[target])| = |2*dp[target] - sum|
    return sum - 2 * dp[target];
};

// 测试
let stones = [2, 7, 4, 1, 8, 1];
console.log(lastStoneWeightII(stones)); // 输出: 1