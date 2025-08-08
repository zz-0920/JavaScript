var findLengthOfLCIS = function(nums) {
    let dp = new Array(nums.length).fill(1);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            dp[i] = dp[i - 1] + 1;
        } else {
            dp[i] = 1;
        }
    }
    return Math.max(...dp);
};