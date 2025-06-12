var backspaceCompareOptimized = function(s, t) {
    let i = s.length - 1;
    let j = t.length - 1;
    let skipS = 0; // s中需要跳过的字符数
    let skipT = 0; // t中需要跳过的字符数
    
    while (i >= 0 || j >= 0) {
        // 处理字符串s
        while (i >= 0) {
            if (s[i] === '#') {
                skipS++;
                i--;
            } else if (skipS > 0) {
                skipS--;
                i--;
            } else {
                break;
            }
        }
        
        // 处理字符串t
        while (j >= 0) {
            if (t[j] === '#') {
                skipT++;
                j--;
            } else if (skipT > 0) {
                skipT--;
                j--;
            } else {
                break;
            }
        }
        
        // 比较当前字符
        if (i >= 0 && j >= 0 && s[i] !== t[j]) {
            return false;
        }
        
        // 一个字符串结束，另一个还有字符
        if ((i >= 0) !== (j >= 0)) {
            return false;
        }
        
        i--;
        j--;
    }
    
    return true;
};