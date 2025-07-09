var isBalanced = function(root) {
    let left = root.left, right = root.right;
    let leftDepth = 0, rightDepth = 0; 
    while(left) {
        left = left.left
        leftDepth++
    }
    while(right) {
        right = right.right
        rightDepth++
    }
    if ((leftDepth - rightDepth) === 1 || (leftDepth - rightDepth) === -1) return true
    else return false
};