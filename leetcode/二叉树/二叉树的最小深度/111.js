var minDepth = function(root) {
    if(!root) return 0;
    let queue = [root], depth = 1;
    while (queue.length) {
        let length = queue.length;
        for (let i = 0; i < length; i++) {
            let node = queue.shift();
            if(!node.left && !node.right) return depth;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            
        }
        depth ++
    }
};