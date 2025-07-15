var getMinimumDifference = function(root) {
    let res = Infinity, queue = []
    function dfs(root) {
        if(!root) return;
        dfs(root.left);
        console.log(root.val);
        
        queue.push(root.val);
        if(queue.length >= 2) {
            res = Math.min(res, queue[queue.length-1] - queue[queue.length-2]);
        }
        dfs(root.right);
    }
    dfs(root);
    console.log(queue);
    return res;
};
// const root = {
//     val: "1",
//     left: {
//         val: "2",
//         left: {
//             val: "4"
//         },
//         right: {
//             val: "5"
//         }
//     },
//     right: {
//         val: "3",
//         left: {
//             val: "6"
//         }
//     }
// }
// getMinimumDifference(root)
