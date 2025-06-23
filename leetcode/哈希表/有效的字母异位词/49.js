var groupAnagrams = function(strs) {
    if (strs.length === 1 && strs[0] === "") return [[""]]
    let obj = {}
    let base = 'a'.charCodeAt()
    for (let i = 0; i < strs.length; i++) {
        const table = new Array(26).fill(0);
        for (let j = 0; j < strs[i].length; j++) {
            table[strs[i][j].charCodeAt() - base]++
        }
        obj[table] ? obj[table].push(strs[i]) : obj[table] = [strs[i]]
    }
    return Object.values(obj)
};