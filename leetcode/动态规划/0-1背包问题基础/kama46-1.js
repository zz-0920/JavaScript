let n = 4;
let bagWeight = 5;
let weight = [1, 2, 3, 4];
let value = [1, 2, 3, 4];

// 一维dp数组解决背包问题
var maxValue = function (n, bagWeight, weight, value) {
    // 正确初始化：创建一维数组并填充0
    let dp = new Array(bagWeight + 1).fill(0);

    // 遍历每个物品
    for (let i = 0; i < n; i++) {
        // 关键：从右到左遍历背包容量
        for (let j = bagWeight; j >= weight[i]; j--) {
            // 正确的状态转移方程
            dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
        }
        console.log(dp)
    }
    
    return dp[bagWeight];  // 返回最大价值
};

// 调用函数并输出结果
let result = maxValue(n, bagWeight, weight, value);
console.log(result);  // 输出: 5