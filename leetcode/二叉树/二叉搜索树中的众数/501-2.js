var findMode = function(root) {
    let maxCount = 0;
    let count = 0;
    let pre = null;
    let res = [];
    
    function traversal(cur) {
        if (!cur) return;
        
        traversal(cur.left);
        
        // 处理当前节点
        if (pre === null || cur.val !== pre.val) {
            count = 1;  // 新值开始计数
        } else {
            count++;    // 相同值计数增加
        }
        
        // 更新众数结果
        if (count > maxCount) {
            // 发现更高频率，清空之前结果
            res.length = 0;
            res.push(cur.val);
            maxCount = count;
        } else if (count === maxCount) {
            // 相同最高频率，添加到结果
            res.push(cur.val);
        }
        
        pre = cur;
        
        traversal(cur.right);
    }
    
    traversal(root);
    return res;
};