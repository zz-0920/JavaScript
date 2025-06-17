var spiralOrder = function(matrix) {
    if (!matrix || matrix.length === 0) return [];
    
    const m = matrix.length, n = matrix[0].length;
    const visited = Array(m).fill().map(() => Array(n).fill(false));
    const result = [];
    
    // 方向：右、下、左、上
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let dirIndex = 0;
    let row = 0, col = 0;
    
    for (let i = 0; i < m * n; i++) {
        result.push(matrix[row][col]);
        visited[row][col] = true;
        
        const nextRow = row + directions[dirIndex][0];
        const nextCol = col + directions[dirIndex][1];
        
        // 如果下一个位置越界或已访问，则转向
        if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n || visited[nextRow][nextCol]) {
            dirIndex = (dirIndex + 1) % 4;
        }
        
        row += directions[dirIndex][0];
        col += directions[dirIndex][1];
    }
    
    return result;
};