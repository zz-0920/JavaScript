var invertTree = function (root) {
    if (!root) return null
    let queue = [root]
    while (queue.length) {
        let node = queue.shift();
        [node.left, node.right] = [node.right, node.left]
        node.left && queue.push(node.left)
        node.right && queue.push(node.right)
    }
    return root
};