var topKFrequent = function(nums, k) {
    // 统计频率
    let map = new Map();
    for(let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    
    // 转换为数组并按频率排序
    let freqArray = Array.from(map.entries());
    freqArray.sort((a, b) => b[1] - a[1]); // O(m log m)，m是不同元素个数
    
    // 取前 k 个元素
    return freqArray.slice(0, k).map(item => item[0]);
};