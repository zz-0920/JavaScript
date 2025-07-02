var isValid = function(s) {
    if (s.length % 2 === 1) return false;
    let map = {
        '(': ')', 
        '{': '}', 
        '[': ']'
        }, stack = [];
    for(let i = 0; i < s.length; i++) {
        if(map[s[i]]) {
            stack.push(s[i])
        } else {
            if (map[stack.pop()] !== s[i]) {
                return false;
            }
        }
    }
    return s.length === 0;
};