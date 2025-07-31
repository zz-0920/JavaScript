var canPartition = function (nums) {
    let sum = 0;
    nums.forEach(element => {
        sum += element
    });
    
    if (sum % 2 === 0) sum = sum / 2
    else return false;

    if (Math.max(...nums) > sum) return false;

    let dp = new Array(sum + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
        for (let j = sum; j >= nums[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
            if (dp[j] === sum) return true
        }
    }

    return false
};
let nums = [1, 5, 11, 5];
console.log(canPartition(nums))