// 时间复杂度O(n)
var searchRange = function(nums, target) {
    let begin = -1, end = -1
    for (var i = 0; i <nums.length; i++) {
        if( begin === -1) {
            if (nums[i] === target) {
                begin = i
                end = i
            }
        }else {
            if (nums[i] === target) {
                end = i
            }
        }
    }
    return [begin,end]
};