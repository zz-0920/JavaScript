var isValidBST = function (root) {
    const queue = [];
    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        queue.push(node.val);
        dfs(node.right);
    }
    dfs(root);
    for (let i = 0; i < queue.length - 1; i++) {
        if (queue[i] >= queue[i + 1]) return false;
    }
    return true;
};