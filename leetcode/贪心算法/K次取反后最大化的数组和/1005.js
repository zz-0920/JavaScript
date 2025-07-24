var largestSumAfterKNegations = function (nums, k) {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length && k > 0; i++) {
        if (nums[i] <= 0) {
            nums[i] = -nums[i];
            k--;
        } else {
            break;
        }
    }
    console.log(nums, k);
    if (k % 2) {
        nums.sort((a, b) => a - b);
        nums[0] = -nums[0];
    }
    return nums.reduce((a, b) => a + b);
};
let nums = [4,-5,4,-5,9,4,5], k = 1;
console.log(largestSumAfterKNegations(nums, k));
console.log(nums);