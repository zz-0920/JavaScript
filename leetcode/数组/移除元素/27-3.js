var removeElement = function(nums, val) {
    let i = 0;
    let n = nums.length;
    
    while (i < n) {
        if (nums[i] === val) {
            nums[i] = nums[n - 1]; // 用最后一个元素替换当前元素
            n--; // 减少数组长度
        } else {
            i++;
        }
    }
    
    return n;
};