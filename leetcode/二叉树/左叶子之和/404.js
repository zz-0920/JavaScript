var sumOfLeftLeaves = function(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 0;
    let leftNum = sumOfLeftLeaves(root.left)
    if (root.left && !root.left.left && !root.left.right) leftNum =  root.left.val
    let rightNum = sumOfLeftLeaves(root.right)
    let sum = leftNum + rightNum
    return sum
};