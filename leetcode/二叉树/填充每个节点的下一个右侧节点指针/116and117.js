var connect = function(root) {
    if (root === null) {
        return root;
    }
    const Q = [root]; 
    while (Q.length > 0) {
        const size = Q.length;
        for(let i = 0; i < size; i++) {
            const node = Q.shift();
            if (i < size - 1) {
                node.next = Q[0];
            }
            if (node.left !== null) {
                Q.push(node.left);
            }
            if (node.right !== null) {
                Q.push(node.right);
            }
        }
    }
    return root;
};