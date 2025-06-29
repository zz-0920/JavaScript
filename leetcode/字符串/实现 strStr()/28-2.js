var strStr = function (haystack, needle) {
    if (needle === '') return 0;

    // 构建next数组（部分匹配表）
    function buildNext(pattern) {
        const next = new Array(pattern.length).fill(0);
        let j = 0; // 前缀指针

        for (let i = 1; i < pattern.length; i++) {
            // 当字符不匹配时，回退j指针
            while (j > 0 && pattern[i] !== pattern[j]) {
                j = next[j - 1];
            }

            // 字符匹配时，更新next数组
            if (pattern[i] === pattern[j]) {
                j++;
            }
            next[i] = j;
        }
        return next;
    }

    const next = buildNext(needle);
    let j = 0; // needle的指针

    for (let i = 0; i < haystack.length; i++) {
        // 当字符不匹配时，利用next数组跳转
        while (j > 0 && haystack[i] !== needle[j]) {
            j = next[j - 1];
        }

        // 字符匹配时，移动needle指针
        if (haystack[i] === needle[j]) {
            j++;
        }

        // 完全匹配时返回起始位置
        if (j === needle.length) {
            return i - needle.length + 1;
        }
    }

    return -1;
};