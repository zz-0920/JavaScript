var findMaxForm = function (strs, m, n) {
    let dp = new Array(strs.length).fill().map(
        () => Array(m + 1).fill().map(
            () => Array(n + 1).fill(0)
        ))
    let map = [];

    for (let str of strs) {
        let mCount = 0, nCount = 0;
        for (let s of str) {
            if (s === '0') mCount++
            if (s === '1') nCount++
        }
        map.push([mCount, nCount])
    }
    
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j <= m; j++) {
            for (let k = 0; k <= n; k++) {
                if (i === 0) {
                    // 第一个字符串，如果能放下就取，否则不取
                    if (j >= map[i][0] && k >= map[i][1]) {
                        dp[i][j][k] = 1;
                    } else {
                        dp[i][j][k] = 0;
                    }
                } else {
                    // 不取第i个字符串
                    dp[i][j][k] = dp[i-1][j][k];
                    
                    // 如果能放下第i个字符串，考虑取它
                    if (j >= map[i][0] && k >= map[i][1]) {
                        dp[i][j][k] = Math.max(
                            dp[i][j][k], 
                            dp[i-1][j-map[i][0]][k-map[i][1]] + 1
                        );
                    }
                }
            }
        }
    }
    
    return dp[strs.length-1][m][n];
};

let strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
console.log(findMaxForm(strs, m, n)); // 输出: 4
findMaxForm(strs, m, n)