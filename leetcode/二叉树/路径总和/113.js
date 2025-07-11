var pathSum = function(root, targetSum) {
    let res = [], path = [];
    function traversal(root, res, targetSum) {
        targetSum = targetSum - root.val;
        path.push(root.val)
        if (!root.left && !root.right && targetSum === 0) {
            res.push([...path])
        }
        if (root.left) {
            traversal(root.left, res, targetSum)
            path.pop()
        }
        if (root.right) {
            traversal(root.right, res, targetSum)
            path.pop()
        }
    }
    if (!root) return res;
    traversal(root, res, targetSum)
    return res;
};