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
// 层序遍历二叉树
function levelOrderTraversal(root) {
    if(!root) return;
    let queue = [];
    queue.push(root);
    while(queue.length) {
        let node = queue.shift();
        console.log(node.val);
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
    }
}