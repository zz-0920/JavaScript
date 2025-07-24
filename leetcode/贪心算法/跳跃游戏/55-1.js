var canJump = function (nums) {
    if (nums.length === 1) return true;
    if (nums.length === 2) return nums[0] >= nums.length - 1;
    for (let i = 0; i < nums.length - 1; i++) {
        if ((nums[i] + i) >= nums.length - 1) return canJump(nums.slice(0, i + 1));
    }
    return false;
};