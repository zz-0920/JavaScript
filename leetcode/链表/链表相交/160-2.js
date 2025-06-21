var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;
    
    let pA = headA, pB = headB;
    
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    
    return pA; // 相交节点或null
};
console.log(null === null)