var canJump = function (nums) {
    let maxindex = 0
    for (let i = 0; i < nums.length; i++) {
        if (i > maxindex) return false
        maxindex = Math.max(maxindex, i + nums[i])
        if (maxindex >= nums.length - 1) return true
    }
};