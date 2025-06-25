var intersect = function(nums1, nums2) {
    nums1.sort((x, y) => x - y);
    nums2.sort((x, y) => x - y);
    let length1 = 0, length2 = 0, arr = []
    while(length1 < nums1.length && length2 < nums2.length) {
        if(nums1[length1] === nums2[length2]) {
            arr.push(nums1[length1])
            length1++
            length2++
        }else if(nums1[length1] < nums2[length2]) {
            length1++
        }else {
            length2++
        }
    }
    return arr
};