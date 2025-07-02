var maxSlidingWindow = function(nums, k) {
    if(nums.length <= k){
        let res = nums[0]
        for(let i = 0; i < nums.length; i++)
            res = Math.max(res, nums[i])
        return [res]
    }
    
    const result = [];
    const deque = []; // 存储数组索引，保持单调递减
    
    for(let i = 0; i < nums.length; i++) {
        // 移除超出窗口范围的元素
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }
        
        // 维护单调递减队列 - 修正：比较值而不是索引
        while(deque.length > 0 && nums[i] >= nums[deque[deque.length - 1]]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // 修正：使用 k-1 而不是硬编码的 2
        if(i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
};