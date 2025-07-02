var removeDuplicates = function(s) {
    let stack = []
    for(char of s) {
        if(stack.length > 0 && char === stack[stack.length - 1]) {
            stack.pop()
        }else {
            stack.push(char)
        }
    }
    return stack.join('')
};