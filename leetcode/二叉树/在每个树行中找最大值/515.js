var largestValues = function(root) {
    if (root === null) return [];
    const res = [];
    const queue = [root];
    while (queue.length > 0) {
        const levelSize = queue.length;
        let  maxVal = -Infinity
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if(node.val > maxVal) maxVal = node.val
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(maxVal);
    }
    return res;
};