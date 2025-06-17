var spiralOrder = function(matrix) {
    if (!matrix || matrix.length === 0) return [];
    
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    let result = [];
    
    while (top <= bottom && left <= right) {
        // 从左到右遍历上边界
        for (let j = left; j <= right; j++) {
            result.push(matrix[top][j]);
        }
        top++;
        
        // 从上到下遍历右边界
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;
        
        // 从右到左遍历下边界（如果还有行）
        if (top <= bottom) {
            for (let j = right; j >= left; j--) {
                result.push(matrix[bottom][j]);
            }
            bottom--;
        }
        
        // 从下到上遍历左边界（如果还有列）
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }
    
    return result;
};