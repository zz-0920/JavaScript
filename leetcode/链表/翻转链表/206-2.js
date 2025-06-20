var reverseList = function(head) {
    return reverse(null, head);
};
var reverse = function(pre, head) {
    if(!head) return pre;
    const temp = head.next;
    head.next = pre;
    pre = head
    return reverse(pre, temp);
};