var intersect = function(nums1, nums2) {
    if (nums1.length > nums2.length) return intersect(nums2, nums1)
    let map = new Map()
    let arr = []
    
    // 统计nums1中每个元素的出现次数
    for(let i = 0; i < nums1.length; i++) {
        let value = 1
        if (map.has(nums1[i])) {
            value = map.get(nums1[i]) + 1
        }
        map.set(nums1[i], value)
    }
    
    // 遍历nums2，找交集
    for(let i = 0; i < nums2.length; i++) {
        if(map.has(nums2[i])) {
            let value = map.get(nums2[i])
            if (value > 0) {
                arr.push(nums2[i])
                map.set(nums2[i], value - 1)
            }
        }
    }
    return arr
};