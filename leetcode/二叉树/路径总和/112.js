var hasPathSum = function(root, targetSum) {
    // 空节点直接返回false
    if (!root) return false;
    // 减去当前节点的值
    targetSum -= root.val;
    // 如果是叶子节点，检查targetSum是否为0
    if (!root.left && !root.right) {
        return targetSum === 0;
    }
    // 递归检查左右子树，只要有一条路径满足就返回true
    return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};