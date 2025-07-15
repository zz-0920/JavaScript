var getMinimumDifference = function(root) {
    let pre = null, res = Infinity;
    function traversal(cur) {
        if (!cur) return;
        traversal(cur.left);
        if (pre) {
            res = Math.min(res,cur.val - pre.val)
        }
        pre = cur;
        traversal(cur.right)
    }
    traversal(root);
    return res
};