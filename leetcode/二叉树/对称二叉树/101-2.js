var isSymmetric = function (root) {
    if(root === null) return true;
    const compareNode = function(left, right) {
        if (!left && !right) return true
        if (!left && right || left && !right) return false
        if (left.val !== right.val) return false
        let outSide = compareNode(left.left, right.right);
        let inSide = compareNode(left.right, right.left);
        return outSide && inSide;
    }
    return compareNode(root.left, root.right);
};