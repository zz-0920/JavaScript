var repeatedSubstringPattern = function(s) {
    let ss = (s + s).slice(1, -1)
    return ss.includes(s)
};