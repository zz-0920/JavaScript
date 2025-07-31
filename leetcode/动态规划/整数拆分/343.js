var integerBreak = function (n) {
    let dp = new Array(n + 1)
    dp[0] = 0
    dp[1] = 0
    for (let i = 2; i <= n; i++) {
        curMax = 0;
        for (let j = 1; j < i; j++) {
            curMax = Math.max(curMax, Math.max(j * dp[i - j], j * (i - j)))
        }
        dp[i] = curMax;
    }
    return dp[n]
};