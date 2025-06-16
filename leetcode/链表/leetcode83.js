var deleteDuplicates = function(head) {
    let cur = head
    while(cur && cur.next !== null) {
        if (cur.val === cur.next.val) cur.next = cur.next.next
        else cur = cur.next
    }
    return head
};