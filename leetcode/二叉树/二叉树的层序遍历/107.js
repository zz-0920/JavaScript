var levelOrderBottom = function(root) {
    if(root === null) return []
    let queue = [root], res = [];
    while (queue.length) {
        let node = null, cur = [], length = queue.length;
        for(let i = 0; i < length; i++) {
            node = queue.shift();
            cur.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        res.push(cur)
    }
    return res.reverse()
};