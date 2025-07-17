var letterCombinations = function(digits) {
    if (digits.length === 0) return [];
    
    const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    let res = [];
    
    function backtracking(index, path) {
        if (index === digits.length) {
            res.push(path);
            return;
        }
        
        const letters = map[digits[index]];
        for (let i = 0; i < letters.length; i++) {
            backtracking(index + 1, path + letters[i]);
        }
    }
    
    backtracking(0, '');
    return res;
};
console.log(letterCombinations('23'));