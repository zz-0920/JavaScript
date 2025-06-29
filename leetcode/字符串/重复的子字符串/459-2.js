var repeatedSubstringPattern = function(s) {
    const n = s.length;
    
    // 枚举所有可能的重复子串长度
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) { // 长度必须能整除总长度
            const pattern = s.substring(0, i);
            let isRepeated = true;
            
            // 检查是否能完全重复构成原字符串
            for (let j = i; j < n; j += i) {
                if (s.substring(j, j + i) !== pattern) {
                    isRepeated = false;
                    break;
                }
            }
            
            if (isRepeated) return true;
        }
    }
    return false;
};