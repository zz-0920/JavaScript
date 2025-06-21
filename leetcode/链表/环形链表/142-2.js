var detectCycle = function(head) {
    const visited = new Set();
    let current = head;
    
    while (current !== null) {
        if (visited.has(current)) {
            return current; // 找到环的入口节点
        }
        visited.add(current);
        current = current.next;
    }
    
    return null; // 没有环
};