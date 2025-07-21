var permuteUnique = function(nums) {
    let res = [], path = [], map = {};
    nums.sort((a, b) => a - b); // 排序
    function backtracking(map) {
        if(path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for(let i = 0; i < nums.length; i++) {
            if(map[i] === true) continue;
            if(i > 0 && nums[i] === nums[i - 1] && map[i - 1] === false) continue;
            path.push(nums[i]);
            map[i] = true;
            backtracking(map);
            path.pop();
            map[i] = false;
        }
    }
    backtracking(map);
    return res;
};