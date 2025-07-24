var jump = function(nums) {
    let maxIndex = 0, step = 0, end = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        maxIndex = Math.max(maxIndex, i + nums[i]);
        if (i === end) {
            end = maxIndex;
            step++;
        }
    }
    return step;
};