var permute = function(nums) {
    let res = [], path = [];
    let backtracking = (set) => {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (set.has(nums[i])) continue;
            path.push(nums[i]);
            set.add(nums[i]);
            backtracking(set);
            path.pop();
            set.delete(nums[i]);
        }
    }
    let set = new Set();
    backtracking(set);
    return res;
};
let nums = [1,2,3];
console.log(permute(nums));