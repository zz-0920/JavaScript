var convertBST = function(root) {
    let pre = 0;
    function travesal(cur) {
        if (!cur) return;
        travesal(cur.right);
        cur.val += pre;
        pre = cur.val
        travesal(cur.left)
    }
    travesal(root)
    return root
};