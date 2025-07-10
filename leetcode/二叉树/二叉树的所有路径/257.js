var binaryTreePaths = function (root) {
    //递归遍历+递归三部曲
    let res = [];
    //1. 确定递归函数 函数参数
    const getPath = function (node, curPath) {
        //2. 确定终止条件，到叶子节点就终止
        if (!node.left && !node.right) {
            curPath += node.val;
            res.push(curPath)
            return;
        }
        //3. 确定单层递归逻辑
        curPath += node.val + '->';
        node.left && getPath(node.left, curPath);
        node.right && getPath(node.right, curPath);
        return;
    }
    getPath(root, '');
    return res;
};