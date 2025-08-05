const rob = function (root) {
    const postOrder = node => {
        if (!node) return [0, 0];
        const left = postOrder(node.left);
        const right = postOrder(node.right);
        const DoNot = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        const Do = node.val + left[0] + right[0];
        return [DoNot, Do];
    };
    const res = postOrder(root);
    return Math.max(...res);
};