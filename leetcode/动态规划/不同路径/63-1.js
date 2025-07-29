var uniquePathsWithObstacles = function (obstacleGrid) {
    let m = obstacleGrid.length, n = obstacleGrid[0].length;
    
    // 如果起点或终点有障碍物，直接返回0
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) {
        return 0;
    }
    
    // 创建dp数组
    const dp = Array(m).fill().map(() => Array(n).fill(0));
    
    // 初始化起点
    dp[0][0] = 1;
    
    // 初始化第一行
    for (let j = 1; j < n; j++) {
        if (obstacleGrid[0][j] === 0) {
            dp[0][j] = dp[0][j-1];
        } else {
            dp[0][j] = 0;
        }
    }
    
    // 初始化第一列
    for (let i = 1; i < m; i++) {
        if (obstacleGrid[i][0] === 0) {
            dp[i][0] = dp[i-1][0];
        } else {
            dp[i][0] = 0;
        }
    }
    
    // 填充dp数组
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 0) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            } else {
                dp[i][j] = 0;  // 障碍物位置路径数为0
            }
        }
    }
    console.log(dp)
    return dp[m-1][n-1];
};

// 正确的测试用例
const grid1 = [
    [0,0,0],
    [0,1,0],
    [0,0,0]
];
console.log(uniquePathsWithObstacles(grid1)); // 输出: 2

const grid2 = [
    [0,1],
    [0,0]
];
console.log(uniquePathsWithObstacles(grid2)); // 输出: 1