var postorderTraversal = function(root, res = []) {
    if (root === null) {
        return res;
    }
    const stack1 = [root];
    const stack2 = [];
    while (stack1.length > 0) {
        const node = stack1.pop();
        stack2.push(node);
        if (node.left !== null) stack1.push(node.left);
        if (node.right !== null) stack1.push(node.right);
    }
    while (stack2.length > 0) {
        res.push(stack2.pop().val);
    }
    return res;
};