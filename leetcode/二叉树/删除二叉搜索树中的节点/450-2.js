var deleteNode = function(root, key) {
    if (!root) return null;
    if (root.val == key) {
        if (!root.left && !root.right) root = null;
        else if (root.left && !root.right) root = root.left;
        else if (!root.left && root.right) root = root.right;
        else {
            let successor = root.right;
            while (successor.left) successor = successor.left;
            root.val = successor.val;
            root.right = deleteNode(root.right, successor.val);
        }
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key);
    } else {
        root.right = deleteNode(root.right, key);
    }
    return root;
};