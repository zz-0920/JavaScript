var mergeTrees = function(root1, root2) {
    let queue = [];
    if (root1 === null) return root2;
    if (root2 === null) return root1;
    queue.push(root1, root2);
    while (queue.length) {
        let node1 = queue.shift(), node2 = queue.shift();
        node1.val += node2.val;
        if (node1.left && node2.left) {
            queue.push(node1.left, node2.left);
        }
        if (node1.right && node2.right) {
            queue.push(node1.right, node2.right);
        }
        if (node1.left === null && node2.left !== null) {
            node1.left = node2.left;
        }
        if (node1.right === null && node2.right !== null) {
            node1.right = node2.right;
        }
    }
    return root1;
};