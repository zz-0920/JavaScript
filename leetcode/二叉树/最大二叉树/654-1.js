var constructMaximumBinaryTree = function (nums) {
    if (nums.length === 0) return null;
    let max = Math.max(...nums);
    let maxIndex = nums.indexOf(max);
    let root = new TreeNode(max);
    root.left = constructMaximumBinaryTree(nums.slice(0, maxIndex));
    root.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1));
    return root;
};
