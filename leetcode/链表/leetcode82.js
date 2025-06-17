var deleteDuplicates = function(head) {
    if (!head) return null;
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;  
    let cur = head;    
    while (cur) {
        if (cur.next && cur.val === cur.next.val) {
            const duplicateVal = cur.val;
            while (cur && cur.val === duplicateVal) {
                cur = cur.next;
            }
            prev.next = cur;
        } else {
            prev = cur;
            cur = cur.next;
        }
    }
    return dummy.next;
};