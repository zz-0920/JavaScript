var uniquePaths = function (m, n) {
    const memo = new Map();
    
    function dfs(i, j) {
        // 边界条件
        if (i === 0 || j === 0) return 1;
        
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key);
        
        const result = dfs(i-1, j) + dfs(i, j-1);
        memo.set(key, result);
        return result;
    }
    
    return dfs(m-1, n-1);
};
uniquePaths(3, 3)