var numSquares = function (n) {
    let dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i * i <= n; i++) {
        let square = i * i;
        for (let j = square; j <= n; j++) {
            dp[j] = Math.min(dp[j], dp[j - square] + 1);
        }
    }
    
    return dp[n];
};