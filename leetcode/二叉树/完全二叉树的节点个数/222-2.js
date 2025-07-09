var countNodes = function(root) {
    //利用完全二叉树的特点
    if(root === null) {
        return 0;
    }
    let left = root.left;
    let right = root.right;
    let leftDepth = 0, rightDepth = 0;
    while(left) {
        left = left.left;
        leftDepth++;
    }
    while(right) {
        right = right.right;
        rightDepth++;
    }
    if(leftDepth == rightDepth) {
        return Math.pow(2, leftDepth+1) - 1;
    }
    return countNodes(root.left) + countNodes(root.right) + 1;
};
