var minSubArrayLen = function(target, nums) {
    let sum = 0,arr = []
    for (let i =0; i < nums.length; i++) {
        arr.push(nums[i])
        sum += nums[i]
        while(sum >= target) {
            if (sum - arr[0] >= target) {
                arr.shift()
            }
        }
    }
    if (sum >= target) return arr.length
    else return 0
};