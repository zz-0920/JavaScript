var getIntersectionNode = function(headA, headB) {
    let curA = headA, curB = headB, countA = 0, countB = 0, listA = headA, listB = headB
    while (curA) {
        curA = curA.next;
        countA++;
    }
    while (curB) {
        curB = curB.next;
        countB++;
    }
    if (countA === countB) {
        for (let i = 0; i < countA; i++) {
            if (listA === listB) return listA
            else {
                listA = listA.next;
                listB = listB.next;
            }
        }
    } else if (countA > countB) {
        for (let i = 0; i < countA - countB; i++) {
            listA = listA.next;
        }
        for (let i = 0; i < countB; i++) {
            if (listA === listB) return listA
            else {
                listA = listA.next;
                listB = listB.next;
            }
        }
    } else {
        for (let i = 0; i < countB - countA; i++) {
            listB = listB.next;
        }
        for (let i = 0; i < countA; i++) {
            if (listA === listB) return listB
            else {
                listA = listA.next;
                listB = listB.next;
            }
        }
    }
    return null;
};