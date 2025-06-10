const nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3;

// var maxSlidingWindow = function(nums, k) {
//   const len = nums.length;
//   let left = 0
//   let right = k - 1
//   const result = []
//   while (right < len) {
//     let max = -Infinity
//     for (let i = left; i <= right; i++) {
//       max = Math.max(max, nums[i])
//     }
//     result.push(max)
//     left++
//     right++
//   }
//   return result
// };

// 高效的双端队列解法（面试推荐）
var maxSlidingWindowOptimal = function(nums, k) {
    const result = [];
    const deque = []; // 存储数组索引，保持单调递减
    
    for (let i = 0; i < nums.length; i++) {
        // 移除超出窗口范围的元素
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }
        
        // 移除所有小于当前元素的元素（保持单调性）
        while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // 当窗口大小达到k时，记录最大值
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
};
console.log(maxSlidingWindow(nums,k))