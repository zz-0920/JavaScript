var wiggleMaxLength = function (nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            nums.splice(i, 1)
            i--
        }
    }
    if (nums.length <= 1) return nums.length
    let res = 2
    for (let i = 1; i < nums.length - 1; i++) {
        if ((nums[i] > nums[i + 1] && nums[i] > nums[i - 1]) || (nums[i] < nums[i + 1] && nums[i] < nums[i - 1])) {
            res++
        }
    }
    return res
};