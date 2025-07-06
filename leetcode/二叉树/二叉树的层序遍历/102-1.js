var levelOrder = function(root) {
    if(root === null) return []
    let queue = [root], arr = [], res = []
    while (queue.length) {
        let currentLevel = [];
        while(queue.length) {
            let node = queue.shift()
            currentLevel.push(node.val);
            if(node.left) arr.push(node.left)
            if(node.right) arr.push(node.right)
        }
        res.push(currentLevel);
        [queue, arr] = [arr, queue]
    }
    return res
};