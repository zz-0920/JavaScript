// 迭代解法
var inorderTraversalIterative = function(root) {
    if (!root) return [];
    const result = [];
    const stack = [];
    let current = root;
    while (stack.length > 0 || current !== null) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    return result;
};