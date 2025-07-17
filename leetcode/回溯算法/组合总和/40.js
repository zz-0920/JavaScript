var combinationSum2 = function(candidates, target) {
    let res = [], path = [];
    candidates.sort((a, b) => a - b);
    
    const backtracking = (num, index) => {
        if(num === 0) {
            res.push([...path]);
            return;
        }
        if(num < 0) return;
        
        for(let i = index; i < candidates.length; i++) {
            // 剪枝1：如果当前数字大于剩余目标，后续数字更大，直接break
            if(candidates[i] > num) break;
            
            // 剪枝2：去重
            if(i > index && candidates[i] === candidates[i - 1]) continue;
            
            path.push(candidates[i]);
            backtracking(num - candidates[i], i + 1);
            path.pop();
        }
    }
    
    backtracking(target, 0);
    return res;
};