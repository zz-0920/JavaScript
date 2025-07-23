var maxSubArray = function(nums) {
    let sum = 0, res = -Infinity
    for (let i = 0; i < nums.length; i++) {
        sum = Math.max(sum + nums[i], nums[i])
        res = Math.max(res, sum)
    }
    return res
};