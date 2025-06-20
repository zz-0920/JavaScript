var removeElements = function(head, val) {
    // 创建哑节点，简化头节点删除逻辑
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;  // prev 指向当前节点的前驱

    while (prev.next !== null) {
        if (prev.next.val === val) {
            // 当前节点需要删除，跳过它
            prev.next = prev.next.next;
        } else {
            // 当前节点不需要删除，prev 移动到当前节点
            prev = prev.next;
        }
    }

    return dummy.next;  // 返回处理后的头节点
};