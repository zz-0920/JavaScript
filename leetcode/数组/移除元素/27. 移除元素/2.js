var removeElement = function(nums, val) {
    let k = 0; // 慢指针，指向下一个有效元素的位置
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i]; // 将有效元素移到前面
            k++;
        }
    }
    
    return k; // 返回有效元素的数量
};