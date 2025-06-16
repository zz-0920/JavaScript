var merge = function(nums1, m, nums2, n) {
    let i = m - 1,j = n - 1;
//    if (m === 0) nums1 = nums2; // 错误的赋值，不会改变 nums1 的引用
    if (m === 0) {
        for (let k = 0; k < n; k++) {
            nums1[k] = nums2[k];
            return;
        }
    }
    while (i >= 0 && j >= 0) {
        if (nums1[i] >= nums2[j]) {
            nums1[i + j + 1] = nums1[i]
            i--
        }else {
            nums1[i + j + 1] = nums2[j]
            j--
        }
    }
    while (j >= 0) {
        nums1[j] = nums2[j];
        j--;
    }
}