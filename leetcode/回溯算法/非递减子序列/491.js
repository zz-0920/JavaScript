var findSubsequences = function(nums) {
    let path = [], res = [];
    let backtracking = (startIndex) => {
        if (path.length > 1) {
            res.push([...path]);
        }
        
        let used = new Set(); // 记录当前层使用过的数值
        
        for (let i = startIndex; i < nums.length; i++) {
            // 同层去重：如果当前层已经使用过这个数值，跳过
            if (used.has(nums[i])) continue;
            
            // 保证递增
            if (path.length > 0 && nums[i] < path[path.length - 1]) continue;
            
            used.add(nums[i]); // 标记当前层使用过这个数值
            path.push(nums[i]);
            backtracking(i + 1);
            path.pop();
        }
    }
    backtracking(0);
    return res;
};
let nums = [1,1,1,1,1]
console.log(findSubsequences(nums));