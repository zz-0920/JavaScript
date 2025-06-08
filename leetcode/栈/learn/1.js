let stack = []; // 主观上说它是一个栈，它就是一个栈。
stack.push('小布丁')
stack.push('老冰棒')
stack.push('东北大板')
stack.push('巧乐兹')
stack.push('可爱多')
// for(let i = 0; i < stack.length; i++) {
//     console.log(`我爱吃${stack[i]}`);
// }

// for(let i = stack.length - 1; i >= 0; i--) {  // 不是栈，是数组。
//     console.log(`我爱吃${stack[i]}`);          // 没有出栈的概念。
// }

// 栈的出栈
while(stack.length > 0) {
    console.log(`我爱吃${stack.pop()}`);
}