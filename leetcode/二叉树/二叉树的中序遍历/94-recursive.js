/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// 递归解法
var inorderTraversal = function(root, res = []) {
    if (!root) return res;
    
    // 中序遍历：左 → 根 → 右
    inorderTraversal(root.left, res);   // 遍历左子树
    res.push(root.val);                 // 访问根节点
    inorderTraversal(root.right, res);  // 遍历右子树
    
    return res;
};