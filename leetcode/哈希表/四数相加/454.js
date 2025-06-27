var fourSumCount = function(nums1, nums2, nums3, nums4) {
    let map = new Map(), res = 0;
    for(let i = 0; i < nums1.length; i++) {
        for(let j = 0; j < nums2.length; j++) {
            // let sumAB = nums1[i] + nums2[j], count = 1;
            // if (map.has(sumAB)){
            //     count = map.get(sumAB) + 1
            //     map.set(sumAB, count)
            // }else {
            //     map.set(sumAB, count)
            // }
            let sum = nums1[i] + nums2[j];
            map.set(sum, (map.get(sum) || 0) + 1);
        }
    }
    for(let i = 0; i < nums3.length; i++) {
        for(let j = 0; j < nums4.length; j++) {
            let sumCD = nums3[i] + nums4[j]
            if(map.has(-sumCD)) res += map.get(-sumCD)
        }
    }
    return res
};