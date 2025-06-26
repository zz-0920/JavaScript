var findAnagrams = function(s, p) {
    const sLen = s.length, pLen = p.length;

    if (sLen < pLen) {
        return [];
    }

    const ans = [];
    const count = Array(26).fill(0);
    for (let i = 0; i < pLen; ++i) {
        ++count[s[i].charCodeAt() - 'a'.charCodeAt()];
        --count[p[i].charCodeAt() - 'a'.charCodeAt()];
    }

    let differ = 0;
    for (let j = 0; j < 26; ++j) {
        if (count[j] !== 0) {
            ++differ;
        }
    }

    if (differ === 0) {
        ans.push(0);
    }

    for (let i = 0; i < sLen - pLen; ++i) {
        if (count[s[i].charCodeAt() - 'a'.charCodeAt()] === 1) {  // 窗口中字母 s[i] 的数量与字符串 p 中的数量从不同变得相同
            --differ;
        } else if (count[s[i].charCodeAt() - 'a'.charCodeAt()] === 0) {  // 窗口中字母 s[i] 的数量与字符串 p 中的数量从相同变得不同
            ++differ;
        }
        --count[s[i].charCodeAt() - 'a'.charCodeAt()];

        if (count[s[i + pLen].charCodeAt() - 'a'.charCodeAt()] === -1) {  // 窗口中字母 s[i+pLen] 的数量与字符串 p 中的数量从不同变得相同
            --differ;
        } else if (count[s[i + pLen].charCodeAt() - 'a'.charCodeAt()] === 0) {  // 窗口中字母 s[i+pLen] 的数量与字符串 p 中的数量从相同变得不同
            ++differ;
        }
        ++count[s[i + pLen].charCodeAt() - 'a'.charCodeAt()];

        if (differ === 0) {
            ans.push(i + 1);
        }
    }

    return ans;
};