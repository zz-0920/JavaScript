var evalRPN = function(tokens) {
    let stack = [];
    for(let i = 0; i < tokens.length; i++) {
        if(tokens[i] === '+') {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(a + b);
        } else if(tokens[i] === '-') {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(a - b);  // a - b，先入栈的减去后入栈的
        } else if(tokens[i] === '*') {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(a * b);
        } else if(tokens[i] === '/') {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(Math.trunc(a / b));  // a / b，先入栈的除以后入栈的
        } else {
            stack.push(parseInt(tokens[i]));
        }
    }
    return stack.pop();
};