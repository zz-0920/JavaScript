var detectCycle = function(head) {
    let slow = head, fast = head;
    
    // 第一阶段：检测是否有环
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    
    if (!fast || !fast.next) return null;
    
    // 第二阶段：找到环的入口
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    return slow;
};