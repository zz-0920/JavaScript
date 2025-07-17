var combinationSum3 = function(k, n) {
    let sum = 0;
    for (let i = 1; i < k; i++) {
        sum += i
    }
    if (n < sum || n > 45) return []  // 预剪枝：边界检查
    let res = [], cur = [];
    function backtracking(n,num) {
        if (cur.length === k && n === 0) {
            res.push([...cur]);
            return;
        }
        if (n < 0) return;  // 剪枝：和超出目标
        for (let i = num; i <= 9 - k + cur.length + 1; i++) {  // 剪枝：循环上界优化
            cur.push(i);
            backtracking(n - i, i + 1);
            cur.pop();
        }
    }
    backtracking(n, 1);
    return res;
};