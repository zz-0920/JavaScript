var solveNQueens = function (n) {
    let res = [], board = Array(n).fill().map(() => Array(n).fill('.'));
    function backtrack(row) {
        if (row === n) {
            res.push(board.map(row => row.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isValid(board, col, row)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }
    backtrack(0);
    return res;
    function isValid(board, col, row) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') {
                return false;
            }
        }
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }
        return true;
    }
}