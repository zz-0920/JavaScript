// 定义链表节点
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// 实现自定义链表
class MyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // 获取链表中下标为 index 的节点的值
    get(index) {
        if (index < 0 || index >= this.size) {
            return -1;
        }
        
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.val;
    }
    
    // 将一个值为 val 的节点插入到链表中第一个元素之前
    addAtHead(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
        this.size++;
    }
    
    // 将一个值为 val 的节点追加到链表中作为链表的最后一个元素
    addAtTail(val) {
        const newNode = new ListNode(val);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    
    // 将一个值为 val 的节点插入到链表中下标为 index 的节点之前
    addAtIndex(index, val) {
        if (index > this.size) {
            return;
        }
        
        if (index <= 0) {
            this.addAtHead(val);
            return;
        }
        
        if (index === this.size) {
            this.addAtTail(val);
            return;
        }
        
        const newNode = new ListNode(val);
        let current = this.head;
        
        // 找到插入位置的前一个节点
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }
    
    // 如果下标有效，则删除链表中下标为 index 的节点
    deleteAtIndex(index) {
        if (index < 0 || index >= this.size) {
            return;
        }
        
        if (index === 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        
        let current = this.head;
        
        // 找到要删除节点的前一个节点
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        // 安全地删除节点，检查 current.next 是否存在
        if (current.next) {
            current.next = current.next.next;
        }
        this.size--;
    }
}

// 测试代码
const myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtIndex(1, 2);    // 链表变为 1->2->3
console.log(myLinkedList.get(1));              // 返回 2
myLinkedList.deleteAtIndex(1);    // 现在，链表变为 1->3
console.log(myLinkedList.get(1));              // 返回 3