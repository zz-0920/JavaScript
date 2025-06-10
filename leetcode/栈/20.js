/**
 * @param {string} s
 * @return {boolean}
 */
// 字符串从左往右遍历，遇到左括号就入栈，遇到右括号就出栈，
// 出栈的时候判断是否匹配，如果匹配就继续，不匹配就返回false。
// 如果遍历完了，栈是空的，就返回true，否则返回false。
var isValid = function(s) {
    if (s.length % 2 === 1) return false;
    let stack = [];
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    for (let char of s) {
        if (map[char]) {
            stack.push(char);
        } else {
            if (map[stack.pop()] !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
};