var findMaxForm = function (strs, m, n) {
    // dp[j][k] 表示最多使用j个0和k个1时能选择的最大字符串数量
    let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let str of strs) {
        let zeros = 0, ones = 0;
        for (let char of str) {
            if (char === '0') zeros++;
            else ones++;
        }
        
        // 从后往前遍历，避免重复使用
        for (let j = m; j >= zeros; j--) {
            for (let k = n; k >= ones; k--) {
                dp[j][k] = Math.max(dp[j][k], dp[j - zeros][k - ones] + 1);
            }
        }
    }
    
    return dp[m][n];
};