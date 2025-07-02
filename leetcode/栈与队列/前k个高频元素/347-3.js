var topKFrequent = function(nums, k) {
    // 统计频率
    let map = new Map();
    for(let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    
    // 桶排序：索引表示频率，值是该频率的元素数组
    let buckets = new Array(nums.length + 1);
    for(let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }
    
    // 将元素放入对应频率的桶中
    for(let [num, freq] of map) {
        buckets[freq].push(num);
    }
    
    // 从高频率到低频率收集前k个元素
    let result = [];
    for(let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if(buckets[i].length > 0) {
            result.push(...buckets[i]);
        }
    }
    
    return result.slice(0, k);
};