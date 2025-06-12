var removeDuplicates = function(nums) {
    // 边界情况：空数组或只有一个元素
    if (nums.length <= 1) {
        return nums.length;
    }
    
    // 慢指针，指向当前不重复元素应该放置的位置
    let slow = 1;
    
    // 快指针遍历数组
    for (let fast = 1; fast < nums.length; fast++) {
        // 如果当前元素与前一个元素不同
        if (nums[fast] !== nums[fast - 1]) {
            // 将不重复元素放到慢指针位置
            nums[slow] = nums[fast];
            slow++;
        }
    }
    
    // 返回新数组的长度
    return slow;
};