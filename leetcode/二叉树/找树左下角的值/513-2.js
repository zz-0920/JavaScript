var findBottomLeftValue = function (root) {
    let maxDepth = -1;
    let res = root.val;
    function traversal(root, depth) {
        if (root.left === null && root.right === null) {
            if (depth > maxDepth) {
                maxDepth = depth;
                res = root.val;
            }
            return;
        }
        depth++
        root.left && traversal(root.left, depth)
        root.right && traversal(root.right, depth)
    }
    traversal(root, 1);
    return res;
};