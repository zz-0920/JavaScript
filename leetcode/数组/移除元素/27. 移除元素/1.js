let nums = [3,2,2,3], val = 3
var removeElement = function(nums, val) {
    let arr = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            arr.push(nums[i])
        }
    }
    let n = nums.length - arr.length
    if (n > 0) {
        for (let i = 0; i < n; i++) {
            arr.push('_')
        }
    }
    return [n, arr]
};
console.log(removeElement(nums, val))