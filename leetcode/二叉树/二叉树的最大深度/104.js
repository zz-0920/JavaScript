var maxDepth = function(root) {
    if(!root) return 0
    let queue = [root], count = 1;
    while (queue.length) {
        let length = queue.length;
        while (length > 0) {
            let node = queue.shift();
            length--;
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        if (queue.length !== 0) count++
    }
    return count
};