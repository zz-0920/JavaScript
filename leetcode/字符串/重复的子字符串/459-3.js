var repeatedSubstringPattern = function(s) {
    // 构建KMP的next数组
    function buildNext(str) {
        const next = new Array(str.length).fill(0);
        let j = 0;
        
        for (let i = 1; i < str.length; i++) {
            while (j > 0 && str[i] !== str[j]) {
                j = next[j - 1];
            }
            if (str[i] === str[j]) {
                j++;
            }
            next[i] = j;
        }
        return next;
    }
    
    const next = buildNext(s);
    const n = s.length;
    const lastNext = next[n - 1];
    
    // 如果存在重复模式，则 n % (n - lastNext) === 0
    return lastNext > 0 && n % (n - lastNext) === 0;
};