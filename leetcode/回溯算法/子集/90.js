var subsetsWithDup = function(nums) {
    let res = [], path = [];
    nums.sort((a, b) => a - b);
    let backtracking = (startIndex) => {
        res.push([...path]);
        for (let i = startIndex; i < nums.length; i++) {
            if (i > startIndex && nums[i] === nums[i - 1]) continue;
            path.push(nums[i]);
            backtracking(i + 1);
            path.pop();
        }
    }
    backtracking(0);
    return res;
};