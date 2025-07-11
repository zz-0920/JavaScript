var buildTree = function(inorder, postorder) {
    if (!inorder.length) return null;
    
    // 后序遍历的最后一个元素是根节点
    let rootVal = postorder[postorder.length - 1];
    let root = new TreeNode(rootVal);
    
    // 在中序遍历中找到根节点的位置
    let rootIndex = inorder.indexOf(rootVal);
    
    // 分割中序遍历数组
    let leftInorder = inorder.slice(0, rootIndex);
    let rightInorder = inorder.slice(rootIndex + 1);
    
    // 分割后序遍历数组
    // 左子树的节点数量 = leftInorder.length
    let leftPostorder = postorder.slice(0, leftInorder.length);
    let rightPostorder = postorder.slice(leftInorder.length, postorder.length - 1);
    
    // 递归构造左右子树
    root.left = buildTree(leftInorder, leftPostorder);
    root.right = buildTree(rightInorder, rightPostorder);
    
    return root;
};