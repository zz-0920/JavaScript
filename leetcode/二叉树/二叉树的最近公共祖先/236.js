var lowestCommonAncestor = function(root, p, q) {
    if (root === null || root === p || root === q) return root;
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if (left !== null && right !== null) return root;
    if (left === null && right !== null) return right;
    else if (left !== null && right === null) return left;
    else return null;
};