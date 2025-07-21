var restoreIpAddresses = function(s) {
    if (s.length < 4 || s.length > 12) return [];
    let res = [];
    const backtracking = (startIndex, path) => {
        if (path.length === 4 && startIndex === s.length) {
            res.push([...path]);
            return;
        }
        for (let i = startIndex; i < s.length; i++) {
            let substring = s.slice(startIndex, i + 1);
            if (substring.length > 3 || +substring > 255) break;
            if (substring.length > 1 && substring[0] === '0') break;
            path.push(substring);
            backtracking(i + 1, path);
            path.pop();
        }
    }
    backtracking(0, []);
    return res.map(item => item.join('.'));
};