var topKFrequent = function(nums, k) {
    let map = new Map(), queue1 = [], stack = []
    nums.sort((a, b) => a - b);
    for(let i = 0; i < nums.length; i++) {
        let count = 1
        while(nums[i] === nums[i + 1]) {
            count++
            i++
        }
        map.set(nums[i], count)
        
        if(queue1.length < k) {
            // 队列未满，直接按频率插入
            if(queue1.length === 0) {
                queue1.push(nums[i])
            }else {
                if(map.get(queue1[queue1.length -1]) > map.get(nums[i])) {
                    queue1.push(nums[i])
                }else{
                    while(map.get(queue1[queue1.length -1]) < map.get(nums[i])) {
                        stack.push(queue1.pop())
                    }
                    queue1.push(nums[i])
                    while(stack.length > 0) queue1.push(stack.pop())
                }
            }
        }else {
            if(map.get(queue1[queue1.length -1]) < map.get(nums[i])){
                while(map.get(queue1[queue1.length -1]) < map.get(nums[i])) {
                    stack.push(queue1.pop())
                }
                queue1.push(nums[i])
                while(stack.length > 1) {
                    queue1.push(stack.pop())
                }
                stack.pop()
            }
        }
    }
    return queue1.reverse(); // 返回频率从高到低的顺序
};