var search = function(nums, target) {
    let min = 0, max = nums.length - 1;
    while(min <= max) {
        let mid = Math.floor((min + max) / 2);
        if(target > nums[mid]){
            min = mid + 1;
        } else if(target < nums[mid]){
            max = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}