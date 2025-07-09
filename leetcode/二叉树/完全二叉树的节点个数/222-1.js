var countNodes = function (root) {
    //递归法计算二叉树节点数
    // 1. 确定递归函数参数
    const getNodeSum = function (node) {
        //2. 确定终止条件
        if (node === null) {
            return 0;
        }
        //3. 确定单层递归逻辑
        let leftNum = getNodeSum(node.left);
        let rightNum = getNodeSum(node.right);
        return leftNum + rightNum + 1;
    }
    return getNodeSum(root);
};