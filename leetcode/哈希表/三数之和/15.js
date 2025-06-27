var threeSum = function(nums) {
    nums.sort((a, b) => a - b); // 1. 先对数组排序，方便后续去重和双指针查找
    let res = [];
    for(let i = 0; i < nums.length - 2; i++) { // 2. 固定第一个数nums[i]
        if(i > 0 && nums[i] === nums[i-1]) continue; // 3. 跳过重复的第一个数，避免重复三元组
        let left = i + 1, right = nums.length - 1; // 4. 用双指针查找剩下两个数
        while(left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if(sum === 0) {
                res.push([nums[i], nums[left], nums[right]]); // 5. 找到一组解，加入结果
                while(left < right && nums[left] === nums[left+1]) left++; // 6. 跳过重复的第二个数
                while(left < right && nums[right] === nums[right-1]) right--; // 7. 跳过重复的第三个数
                left++;
                right--;
            } else if(sum < 0) {
                left++; // 8. 和小于0，左指针右移增大sum
            } else {
                right--; // 9. 和大于0，右指针左移减小sum
            }
        }
    }
    return res;
};