var findMode = function(root) {
    let res = [];
    let maxCount = 0;
    let count = 0;
    let prev = null;
    
    function inorder(node) {
        if (!node) return;
        
        inorder(node.left);
        
        // 处理当前节点
        if (prev === null || node.val !== prev) {
            // 新的值开始
            count = 1;
        } else {
            // 相同值，计数加1
            count++;
        }
        
        // 更新众数结果
        if (count > maxCount) {
            // 发现更高频率，重置结果数组
            res = [node.val];
            maxCount = count;
        } else if (count === maxCount) {
            // 相同频率，添加到结果
            res.push(node.val);
        }
        
        prev = node.val;
        
        inorder(node.right);
    }
    
    inorder(root);
    return res;
};