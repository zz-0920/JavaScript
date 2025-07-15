var findMode = function(root) {
    let map = new Map();
    let maxCount = 0;
    let res = [];
    function inorder(root) {
        if(!root) return;
        inorder(root.left);
        let count = map.get(root.val) || 0;
        map.set(root.val, count + 1);
        if(count + 1 > maxCount) {
            res = [root.val];
            maxCount = count + 1;
        } else if(count + 1 === maxCount) {
            res.push(root.val);
        }
        inorder(root.right);
    }
    inorder(root);
    return res;
};