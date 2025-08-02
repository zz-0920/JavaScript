var maxCount = function (m, n) {
    let dp = new Array(n + 1).fill(0)
    dp[0] = 1;
    for (let j = 1; j <= n; j++) {
        for (let i = 1; i < m; i++) {
            if (i <= j) dp[j] += dp[j - i]
        }
    }
    return dp[n];
}