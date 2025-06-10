/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let max = nums.length - 1
    let min = 0
    while(min <= max){
        let mid = Math.floor((max + min)/2)
        if(nums[mid] === target) return mid;
        else if([mid] < target) min = mid + 1;
        else max = mid - 1;
    }
    return min;
};

