var removeNthFromEnd = function(head, n) {
    let obj = {}, cur = head, count = 1;
    
    // 存储所有节点
    while (cur !== null) {
        obj[count] = cur;
        cur = cur.next;
        count++;
    }
    
    console.log(obj);
    
    const targetIndex = count - n; // 要删除的节点索引
    
    // 如果要删除的是第一个节点
    if (targetIndex === 1) {
        return head.next;
    }
    
    // 找到要删除节点的前一个节点
    for (let key in obj) {
        if (parseInt(key) === targetIndex - 1) {
            // 检查要删除的节点是否存在
            if (obj[key].next) {
                obj[key].next = obj[key].next.next;
            }
            break;
        }
    }
    
    return head;
};
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log(removeNthFromEnd(list, 2))