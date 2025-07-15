var zigzagLevelOrder = function(root) {
    if (!root) return [];
    let queue = [root], res = [],boo = true;
    while (queue.length) {
        let node = null, cur = [], length = queue.length;
        for(let i = 0; i < length; i++) {
            node = queue.shift();
            cur.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        if (boo === true) res.push(cur);
        else res.push(cur.reverse());
        boo = !boo
    }
    return res
};