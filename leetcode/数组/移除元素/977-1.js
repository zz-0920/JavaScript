var sortedSquares = function(nums) {
    let right = nums.length - 1,left = 0
    let arr = []
    while (left <= right) {
        if (Math.pow(nums[left], 2) <= Math.pow(nums[right], 2)){
            arr.unshift(Math.pow(nums[right], 2))
            right--
        }else{
            arr.unshift(Math.pow(nums[left], 2))
            left++
        }
    }
    return arr
};