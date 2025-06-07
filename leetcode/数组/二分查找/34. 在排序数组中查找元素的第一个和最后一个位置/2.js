// 时间复杂度O(log n)
var searchRange = function(nums, target) {
    const begin = (nums, target) => {
        let left = 0, right = nums.length - 1, result = -1
        while(left <= right) {
            let mid = Math.floor((left + right) / 2)
            if (nums[mid] === target) {
                result = mid
                right = mid - 1
            }else if (nums[mid] > target) {
                right = mid - 1
            }else {
                left = mid + 1
            }
        }
        return result
    }
    const end = (nums, target) => {
        let left = 0, right = nums.length - 1, result = -1
        while(left <= right) {
            let mid = Math.floor((left + right) / 2)
            if (nums[mid] === target) {
                result = mid
                left = mid - 1
            }else if (nums[mid] > target) {
                right = mid - 1
            }else {
                left = mid + 1
            }
        }
    return result
    }
    return [begin(nums, target), end(nums, target)]
}