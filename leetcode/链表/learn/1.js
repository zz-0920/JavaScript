const list = {
    val: 'a', // 节点
    next: {
        val: 'b', // 节点
        next: {
            val: 'c', // 节点
            next: null
        }
    }
}
console.log(list.next.next.val); // c

function ListNode(val, next) {
    this.val = val;
    this.next = next ? next : null;
}

const head =  new ListNode('a');

let node = head;
for(let i = 1; i < 10; i++) {
    node.next = new ListNode(i);
}

console.log(head);
