let nums = [2,7,11,15], target = 9;

// var twoSum = function(nums, target) {  //用空间换时间
//     for(let i = 0; i < nums.length; i++){
//         let diff = target - nums[i];
//         let j = nums.indexOf(diff);
//         if(j !== -1 && j !== i){
//             return [i, j]
//         }
//     }
// };

var twoSum = function(nums, target) {  //用空间换时间
    let map = new Map();
    for(let i = 0; i < nums.length; i++){
        let diff = target - nums[i];
        if(map.has(diff)){
            return [map.get(diff), i]
        }
        map.set(nums[i], i)
    }
};