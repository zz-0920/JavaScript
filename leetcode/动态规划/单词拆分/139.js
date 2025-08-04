var wordBreak = function(s, wordDict) {
    let wordSet = new Set(wordDict); // 使用Set提高查找效率
    let dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let j = 1; j <= s.length; j++) {
        for (let i = 0; i < j; i++) {
            // 如果前i个字符可以拆分，且从i到j的子串在字典中
            if (dp[i] && wordSet.has(s.slice(i, j))) {
                dp[j] = true;
                break;
            }
        }
    }
    
    return dp[s.length];
};