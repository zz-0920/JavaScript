const list = [
    { id: 19, parentId: 0 },
    { id: 17, parentId: 16 },
    { id: 18, parentId: 16 },
    { id: 16, parentId: 0 }
]
function constructTree(list, rootID) {
    let map = new Map();
    list.forEach(item => {
        if (!map.has(item.parentId)) {
            map.set(item.parentId, []);
        }
        map.get(item.parentId).push(item);
    })
    
    function dfs(nodeId) {
        let children = map.get(nodeId);
        if (!children) {
            return null;
        }
        
        let result = [];
        children.forEach(child => {
            let node = {
                id: child.id,
                parentId: child.parentId
            };
            
            let childNodes = dfs(child.id);
            if (childNodes) {
                node.children = childNodes;
            }
            
            result.push(node);
        });
        
        return result;
    }
    
    return {
        id: rootID,
        children: dfs(rootID)
    };
}

// 测试代码
console.log(JSON.stringify(constructTree(list, 0), null, 2));