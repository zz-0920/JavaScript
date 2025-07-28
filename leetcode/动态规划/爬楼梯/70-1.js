var climbStairs = function(n) {
    if (n === 1) return 1;
    else if (n === 2) return 2;
    let dp = [1, 2];
    for (let i = 2; i < n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n - 1];
}