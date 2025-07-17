var combinationSum3 = function(k, n) {
    // 修正：最小和应该是1+2+...+k
    let minSum = k * (k + 1) / 2;
    let maxSum = (19 - k) * k / 2;  // 最大和：(9+8+...+(9-k+1))
    if (n < minSum || n > maxSum) return [];
    
    let res = [], cur = [];
    function backtracking(target, num) {
        if (cur.length === k && target === 0) {
            res.push([...cur]);
            return;
        }
        if (target < 0 || cur.length >= k) return;
        
        // 剪枝：检查剩余数字是否足够
        let remaining = k - cur.length;
        let minPossible = 0, maxPossible = 0;
        
        // 计算从num开始的最小和最大可能和
        for (let j = 0; j < remaining; j++) {
            minPossible += num + j;
            maxPossible += 9 - j;
        }
        
        if (target < minPossible || target > maxPossible) return;
        
        for (let i = num; i <= 9 - remaining + 1; i++) {
            cur.push(i);
            backtracking(target - i, i + 1);
            cur.pop();
        }
    }
    backtracking(n, 1);
    return res;
};