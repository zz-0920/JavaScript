var reduce = function(nums, fn, init) {
    let val = init
    for (var i = 0; i < nums.length; i++) {
        val = fn(val, nums[i])
    }
    return val
};