const root = {
    val: "A",
    left: {
        val: "B",
        left: {
            val: "D"
        },
        right: {
            val: "E"
        }
    },
    right: {
        val: "C",
        left: {
            val: "F"
        }
    }
}

// 前序遍历二叉树的函数
function preorderTraversal(root) {
    if(!root) return;
    console.log(root.val);
    preorderTraversal(root.left);
    preorderTraversal(root.right);
}
// 中序遍历二叉树的函数
function inorderTraversal(root) {
    if(!root) return;
    inorderTraversal(root.left);
    console.log(root.val);
    inorderTraversal(root.right);
}
// 后序遍历二叉树的函数
function postorderTraversal(root) {
    if(!root) return;
    postorderTraversal(root.left);
    postorderTraversal(root.right);
    console.log(root.val);
}