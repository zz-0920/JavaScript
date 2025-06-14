var minSubArrayLen = function(target, nums) {
    let left = 0; // 左指针，初始指向数组起始位置
    let sum = 0;  // 当前窗口的和
    let minLength = Infinity; // 记录最小长度，初始化为无穷大
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right]; // 扩展右边界，累加当前元素到窗口和
        
        // 当窗口和大于等于目标值时，尝试收缩左边界以找到更短的子数组
        while (sum >= target) {
            // 更新最小长度
            minLength = Math.min(minLength, right - left + 1);
            // 收缩左边界，减去左指针指向的元素值，并移动左指针
            sum -= nums[left];
            left++;
        }
    }
    
    // 如果minLength仍为无穷大，说明没有符合条件的子数组，返回0；否则返回minLength
    return minLength === Infinity ? 0 : minLength;
};