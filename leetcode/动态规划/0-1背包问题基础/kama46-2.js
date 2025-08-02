let n = 4;
let bagWeight = 5;
let weight = [4, 3, 2, 1];
let value = [4, 3, 2, 1];

// 二维dp数组解决背包问题
var maxValue = function (n, bagWeight, weight, value) {
    let dp = new Array(n).fill().map(() => Array(bagWeight + 1).fill(0));

    // 初始化第一行
    for (let j = 1; j <= bagWeight; j++) {
        if (j >= weight[0]) {
            dp[0][j] = value[0];
        }
    }

    // 填充dp表
    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= bagWeight; j++) {
            if (j >= weight[i]) {
                // 可以选择第i个物品
                dp[i][j] = Math.max(
                    dp[i - 1][j],                    // 不选
                    dp[i - 1][j - weight[i]] + value[i]  // 选
                );
            } else {
                // 背包容量不足，不能选择第i个物品
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    console.log(dp)
    return dp[n - 1][bagWeight];  // 修正：dp[n-1][bagWeight]
};

// 调用函数并输出结果
let result = maxValue(n, bagWeight, weight, value);
console.log(result);  // 输出: 5