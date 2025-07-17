var combine = function(n, k) {
    let res = [], cur = [];
    function backtracking(num) {
        if(cur.length === k) {
            res.push([...cur]);
            return;
        }
        for (let i = num; i <= n - (k - cur.length) + 1; i++) {  // 剪枝：修改上界
            cur.push(i);
            backtracking(i + 1);
            cur.pop();
        }
    }
    backtracking(1);
    return res;
};
console.log(combine(4, 2));