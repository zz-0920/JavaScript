var rob = function(nums) {
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);
    
    function robLinear(start, end) {
        let prev2 = 0, prev1 = 0;
        for (let i = start; i <= end; i++) {
            let current = Math.max(nums[i] + prev2, prev1);
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
    
    let case1 = robLinear(0, nums.length - 2);
    
    let case2 = robLinear(1, nums.length - 1);
    
    return Math.max(case1, case2);
};