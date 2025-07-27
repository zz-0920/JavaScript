var partitionLabels = function (s) {
    // 记录每个字符最后出现的位置
    const lastIndex = {};
    for (let i = 0; i < s.length; i++) {
        lastIndex[s[i]] = i;
    }
    
    const result = [];
    let start = 0, end = 0;
    
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastIndex[s[i]]);
        
        // 当到达当前分区的结束位置时
        if (i === end) {
            result.push(end - start + 1);
            start = end + 1;
        }
    }
    
    return result;
};