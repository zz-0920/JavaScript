/**
 * LeetCode 332: 重新安排行程
 * 
 * 解题思路：
 * 1. 这是一个寻找欧拉路径的问题
 * 2. 从JFK开始，必须使用所有机票恰好一次
 * 3. 如果有多个解，返回字典序最小的
 * 4. 可以使用回溯算法或Hierholzer算法
 * 
 * 方法一：回溯算法
 * 时间复杂度：O(E^d) 其中E是边数，d是最大出度
 * 空间复杂度：O(E)
 */

// 方法一：回溯算法
var findItinerary = function(tickets) {
    // 构建邻接表，并对目的地进行排序以保证字典序
    const graph = new Map();
    
    for (let [from, to] of tickets) {
        if (!graph.has(from)) {
            graph.set(from, []);
        }
        graph.get(from).push(to);
    }
    
    // 对每个起点的目的地进行排序，保证字典序最小
    for (let [from, destinations] of graph) {
        destinations.sort();
    }
    
    const result = ['JFK'];
    const used = new Array(tickets.length).fill(false);
    
    function backtrack() {
        // 如果使用了所有机票，找到了一条有效路径
        if (result.length === tickets.length + 1) {
            return true;
        }
        
        const current = result[result.length - 1];
        
        // 如果当前机场没有出发的航班，返回false
        if (!graph.has(current)) {
            return false;
        }
        
        // 尝试所有可能的目的地
        for (let i = 0; i < tickets.length; i++) {
            if (used[i]) continue;
            
            const [from, to] = tickets[i];
            if (from === current) {
                used[i] = true;
                result.push(to);
                
                if (backtrack()) {
                    return true;
                }
                
                // 回溯
                used[i] = false;
                result.pop();
            }
        }
        
        return false;
    }
    
    backtrack();
    return result;
};

/**
 * 方法二：Hierholzer算法（更高效）
 * 时间复杂度：O(E log E)
 * 空间复杂度：O(E)
 */
var findItineraryHierholzer = function(tickets) {
    // 构建邻接表
    const graph = new Map();
    
    for (let [from, to] of tickets) {
        if (!graph.has(from)) {
            graph.set(from, []);
        }
        graph.get(from).push(to);
    }
    
    // 对每个起点的目的地进行逆序排序
    // 这样pop()时就能得到字典序最小的
    for (let [from, destinations] of graph) {
        destinations.sort((a, b) => b.localeCompare(a));
    }
    
    const result = [];
    const stack = ['JFK'];
    
    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        
        if (graph.has(current) && graph.get(current).length > 0) {
            // 还有未访问的邻居，继续深度优先
            const next = graph.get(current).pop();
            stack.push(next);
        } else {
            // 没有未访问的邻居，加入结果
            result.push(stack.pop());
        }
    }
    
    // 结果是逆序的，需要反转
    return result.reverse();
};

// 测试用例
function test() {
    console.log('=== LeetCode 332: 重新安排行程 ===\n');
    
    // 测试用例1
    const tickets1 = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]];
    console.log('测试用例1:');
    console.log('输入:', JSON.stringify(tickets1));
    console.log('回溯算法结果:', findItinerary(tickets1));
    console.log('Hierholzer算法结果:', findItineraryHierholzer(tickets1));
    console.log('期望输出: ["JFK","MUC","LHR","SFO","SJC"]\n');
    
    // 测试用例2
    const tickets2 = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]];
    console.log('测试用例2:');
    console.log('输入:', JSON.stringify(tickets2));
    console.log('回溯算法结果:', findItinerary(tickets2));
    console.log('Hierholzer算法结果:', findItineraryHierholzer(tickets2));
    console.log('期望输出: ["JFK","ATL","JFK","SFO","ATL","SFO"]\n');
    
    // 测试用例3：更复杂的情况
    const tickets3 = [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]];
    console.log('测试用例3:');
    console.log('输入:', JSON.stringify(tickets3));
    console.log('回溯算法结果:', findItinerary(tickets3));
    console.log('Hierholzer算法结果:', findItineraryHierholzer(tickets3));
    console.log('期望输出: ["JFK","NRT","JFK","KUL"]\n');
}

// 运行测试
test();

// 导出函数（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        findItinerary,
        findItineraryHierholzer
    };
}