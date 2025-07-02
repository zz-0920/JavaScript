class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    }
    
    top() {
        return this.heap[0];
    }
    
    size() {
        return this.heap.length;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][1] <= this.heap[index][1]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    
    bubbleDown(index) {
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && this.heap[leftChild][1] < this.heap[minIndex][1]) {
                minIndex = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild][1] < this.heap[minIndex][1]) {
                minIndex = rightChild;
            }
            
            if (minIndex === index) break;
            [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
    }
}

var topKFrequent = function(nums, k) {
    // 统计频率
    let map = new Map();
    for(let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    
    // 使用最小堆维护前k个高频元素
    let minHeap = new MinHeap();
    
    for(let [num, freq] of map) {
        if(minHeap.size() < k) {
            minHeap.push([num, freq]);
        } else if(freq > minHeap.top()[1]) {
            minHeap.pop();
            minHeap.push([num, freq]);
        }
    }
    
    // 提取结果
    let result = [];
    while(minHeap.size() > 0) {
        result.push(minHeap.pop()[0]);
    }
    
    return result;
};