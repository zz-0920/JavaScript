var detectCycle = function(head) {
    if (head === null) return null
    let cur = head.next, obj = {0: head}, key = 1
    while (cur) {
        for (let i in obj) {
            if (cur !== obj[i]) continue
            else return cur
        }
        obj[key++] = cur
        cur = cur.next
    }
    return null
};