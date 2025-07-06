var levelOrder = function(root) {
    if(!root) return [];
    let res = [], queue = [root];
    while(queue.length) {
        let length = queue.length, level = []
        for (let i = 0; i < length; i++) {
            let cur = queue.shift();
            level.push(cur.val);
            for (let child of cur.children) {
                queue.push(child)
            }
        }
        res.push(level)
    }
    return res
};