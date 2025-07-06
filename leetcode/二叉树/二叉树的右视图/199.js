var rightSideView = function(root) {
    if(root === null) return []
    let queue = [root], res = [root.val]
    while (queue.length) {
        let length = queue.length
        for(let i = 0; i < length; i++) {
            let node = queue.shift()
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }
        queue.length !==0 && res.push(queue[queue.length - 1].val)
    }
    return res
};