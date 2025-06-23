var canConstruct = function(ransomNote, magazine) {
    if (ransomNote.length > magazine.length) return false
    let table = new Array(26).fill(0);
    for (let i = 0; i < magazine.length; i++) {
        table[magazine.codePointAt(i) - 'a'.codePointAt(0)]++;
    }
    for (let j = 0; j < ransomNote.length; j++) {
        table[ransomNote.codePointAt(j) - 'a'.codePointAt(0)]--;
        if (table[ransomNote.codePointAt(j) - 'a'.codePointAt(0)] < 0) return false
    }
    return true
};