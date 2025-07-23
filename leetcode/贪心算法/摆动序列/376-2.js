var wiggleMaxLength = function (nums) {
    if (nums.length <= 1) return nums.length;
    
    let up = 1;   // 以上升结尾的摆动序列长度
    let down = 1; // 以下降结尾的摆动序列长度
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            // 当前是上升趋势，更新up
            up = down + 1;
        } else if (nums[i] < nums[i - 1]) {
            // 当前是下降趋势，更新down
            down = up + 1;
        }
        // 如果相等，则不更新（跳过相等的元素）
    }
    
    return Math.max(up, down);
};

// 测试用例
console.log(wiggleMaxLength([1,7,4,9,2,5])); // 输出: 6
console.log(wiggleMaxLength([1,17,5,10,13,15,10,5,16,8])); // 输出: 7
console.log(wiggleMaxLength([1,2,3,4,5,6,7,8,9])); // 输出: 2