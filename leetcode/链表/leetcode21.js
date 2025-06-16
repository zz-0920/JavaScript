function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

var mergeTwoLists = function(list1, list2) {
    // 处理空链表边界情况
    if (list1 === null) return list2;
    if (list2 === null) return list1;

    let dummy = new ListNode(); // 哑节点简化头节点处理
    let cur = dummy;            // 当前指针指向哑节点

    // 遍历两个链表，直到其中一个为空
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            cur.next = list1; // 连接较小的节点
            list1 = list1.next; // 移动list1指针
        } else {
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next; // 移动当前指针到新节点
    }

    // 连接剩余未遍历完的链表（最多一个链表有剩余）
    cur.next = list1 !== null ? list1 : list2;

    return dummy.next; // 返回合并后的头节点（哑节点的下一个节点）
};