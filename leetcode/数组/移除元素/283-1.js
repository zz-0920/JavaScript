var moveZeroes = function(nums) {
    let slow = 0
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast]
            slow++
        }
    }
    for (slow; slow < nums.length; slow++) nums[slow] = 0
    return nums
};