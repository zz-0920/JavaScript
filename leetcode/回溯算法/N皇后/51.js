/**
 * LeetCode 51: N皇后
 * 
 * 解题思路：
 * 1. 使用回溯算法逐行放置皇后
 * 2. 对于每一行，尝试在每一列放置皇后
 * 3. 检查当前位置是否与之前放置的皇后冲突
 * 4. 冲突检查包括：同列、主对角线、副对角线
 * 5. 如果没有冲突，继续递归下一行
 * 6. 如果有冲突，回溯到上一步
 * 
 * 时间复杂度：O(N!)
 * 空间复杂度：O(N)
 */

var solveNQueens = function(n) {
    const result = [];
    const board = new Array(n).fill(null).map(() => new Array(n).fill('.'));
    
    // 用于快速检查冲突的数据结构
    const cols = new Set();           // 记录已占用的列
    const diag1 = new Set();          // 记录已占用的主对角线 (row - col)
    const diag2 = new Set();          // 记录已占用的副对角线 (row + col)
    
    function backtrack(row) {
        // 递归终止条件：所有行都放置了皇后
        if (row === n) {
            // 将当前棋盘状态转换为字符串数组并加入结果
            result.push(board.map(row => row.join('')));
            return;
        }
        
        // 尝试在当前行的每一列放置皇后
        for (let col = 0; col < n; col++) {
            // 检查当前位置是否与之前的皇后冲突
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue; // 有冲突，跳过这个位置
            }
            
            // 放置皇后
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            // 递归处理下一行
            backtrack(row + 1);
            
            // 回溯：移除皇后
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }
    
    backtrack(0);
    return result;
};

/**
 * 方法二：使用数组记录皇后位置（更节省空间）
 */
var solveNQueensOptimized = function(n) {
    const result = [];
    const queens = new Array(n).fill(-1); // queens[i] 表示第i行皇后所在的列
    
    function isValid(row, col) {
        for (let i = 0; i < row; i++) {
            // 检查列冲突
            if (queens[i] === col) {
                return false;
            }
            // 检查对角线冲突
            if (Math.abs(i - row) === Math.abs(queens[i] - col)) {
                return false;
            }
        }
        return true;
    }
    
    function generateBoard() {
        const board = [];
        for (let i = 0; i < n; i++) {
            const row = new Array(n).fill('.');
            row[queens[i]] = 'Q';
            board.push(row.join(''));
        }
        return board;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(generateBoard());
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                queens[row] = col;
                backtrack(row + 1);
                queens[row] = -1; // 回溯
            }
        }
    }
    
    backtrack(0);
    return result;
};

/**
 * 方法三：位运算优化（最高效）
 */
var solveNQueensBitwise = function(n) {
    const result = [];
    const solutions = [];
    
    function backtrack(row, cols, diag1, diag2) {
        if (row === n) {
            result.push(generateBoard(solutions));
            return;
        }
        
        // 计算当前行可以放置皇后的位置
        let availablePositions = ((1 << n) - 1) & (~(cols | diag1 | diag2));
        
        while (availablePositions) {
            // 获取最右边的1的位置
            const position = availablePositions & (-availablePositions);
            // 清除这个位置
            availablePositions &= availablePositions - 1;
            
            // 计算列号
            const col = Math.log2(position);
            solutions[row] = col;
            
            backtrack(
                row + 1,
                cols | position,
                (diag1 | position) << 1,
                (diag2 | position) >> 1
            );
        }
    }
    
    function generateBoard(solutions) {
        const board = [];
        for (let i = 0; i < n; i++) {
            const row = new Array(n).fill('.');
            row[solutions[i]] = 'Q';
            board.push(row.join(''));
        }
        return board;
    }
    
    backtrack(0, 0, 0, 0);
    return result;
};

// 测试用例
function test() {
    console.log('=== LeetCode 51: N皇后 ===\n');
    
    // 测试用例1: n = 4
    console.log('测试用例1: n = 4');
    const result1 = solveNQueens(4);
    console.log('基础回溯算法结果:');
    result1.forEach((solution, index) => {
        console.log(`解法 ${index + 1}:`);
        solution.forEach(row => console.log(row));
        console.log('');
    });
    
    const result1Opt = solveNQueensOptimized(4);
    console.log('优化回溯算法结果数量:', result1Opt.length);
    
    const result1Bit = solveNQueensBitwise(4);
    console.log('位运算算法结果数量:', result1Bit.length);
    console.log('');
    
    // 测试用例2: n = 1
    console.log('测试用例2: n = 1');
    const result2 = solveNQueens(1);
    console.log('结果:', result2);
    console.log('');
    
    // 性能测试: n = 8
    console.log('性能测试: n = 8');
    
    console.time('基础回溯算法');
    const result8_1 = solveNQueens(8);
    console.timeEnd('基础回溯算法');
    console.log('解的数量:', result8_1.length);
    
    console.time('优化回溯算法');
    const result8_2 = solveNQueensOptimized(8);
    console.timeEnd('优化回溯算法');
    console.log('解的数量:', result8_2.length);
    
    console.time('位运算算法');
    const result8_3 = solveNQueensBitwise(8);
    console.timeEnd('位运算算法');
    console.log('解的数量:', result8_3.length);
}

// 运行测试
test();

// 导出函数（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveNQueens,
        solveNQueensOptimized,
        solveNQueensBitwise
    };
}