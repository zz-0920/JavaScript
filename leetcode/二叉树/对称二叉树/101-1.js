var isSymmetric = function (root) {
    let right = root.right, left = root.left;  // 获取根节点的左右子树
    let queue = [left, right];                 // 初始化队列，成对存储待比较的节点
    while (queue.length) {                     // 当队列不为空时继续循环
        let left = queue.shift();              // 取出第一个节点（左侧）
        let right = queue.shift();             // 取出第二个节点（右侧）
        if (!left && !right) continue;        // 两个都为空，跳过继续
        if (!left || !right) return false;    // 一个为空一个不为空，不对称
        if (left.val !== right.val) return false; // 值不相等，不对称
        queue.push(left.left);                // 左节点的左子树
        queue.push(right.right);              // 右节点的右子树（对称位置）
        queue.push(left.right);               // 左节点的右子树
        queue.push(right.left);               // 右节点的左子树（对称位置）
    }
    return true;                              // 所有检查通过，树是对称的
};