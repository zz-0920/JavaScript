function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

const tree = new TreeNode(1, new TreeNode(2), new TreeNode(3))
console.log(tree)
//TreeNode {
//   val: 1,
//   left: TreeNode { val: 2, left: null, right: null },
//   right: TreeNode { val: 3, left: null, right: null }
// }