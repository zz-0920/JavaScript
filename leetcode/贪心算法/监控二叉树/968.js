var minCameraCover = function (root) {
    let cameras = 0;
    
    // 0: 未被监控, 1: 有摄像头, 2: 被监控但无摄像头
    function dfs(node) {
        if (!node) return 2; // 空节点视为被监控
        
        let left = dfs(node.left);
        let right = dfs(node.right);
        
        // 如果子节点有未被监控的，当前节点必须放摄像头
        if (left === 0 || right === 0) {
            cameras++;
            return 1;
        }
        
        // 如果子节点有摄像头，当前节点被监控
        if (left === 1 || right === 1) {
            return 2;
        }
        
        // 子节点都被监控但无摄像头，当前节点未被监控
        return 0;
    }
    
    // 如果根节点未被监控，需要在根节点放摄像头
    if (dfs(root) === 0) {
        cameras++;
    }
    
    return cameras;
};