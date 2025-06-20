var swapPairs = function(head) {
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let temp = dummyHead;
    while (temp.next !== null && temp.next.next !== null) {
        const node1 = temp.next;
        const node2 = temp.next.next;
        
        // 关键：先保存node2的下一个节点
        const nextPair = node2.next;
        
        // 执行交换
        temp.next = node2;
        node2.next = node1;
        node1.next = nextPair;  // 使用保存的值，而不是node2.next
        
        temp = node1;
    }
    return dummyHead.next;
}

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log(swapPairs(list));