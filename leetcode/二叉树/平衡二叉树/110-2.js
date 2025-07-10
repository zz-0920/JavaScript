var isBalanced = function (root) {
    getDepth = function (root) {
        if (!root) return 0;
        let leftDepth = getDepth(root.left);
        if (leftDepth === -1) return -1;
        let rightDepth = getDepth(root.right);
        if (rightDepth === -1) return -1;
        if (Math.abs(leftDepth - rightDepth) > 1) return -1
        return 1 + Math.max(leftDepth, rightDepth)
    }
    return getDepth(root) !== -1
}