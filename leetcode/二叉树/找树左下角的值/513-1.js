var findBottomLeftValue = function (root) {
    let queue = [root];
    while (queue.length) {
        let level = [], length = queue.length;
        for (let i = 0; i < length; i++) {
            let node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            level.push(node)
        }
        if (queue.length === 0) return level[0].val
    }
};