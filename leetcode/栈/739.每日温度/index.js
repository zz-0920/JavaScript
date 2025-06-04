/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    // 初始化结果数组，所有元素默认为0
    const answer = new Array(n).fill(0);
    // 栈中存储的是温度的索引，且栈中索引对应的温度是单调递减的
    const stack = []; 

    // 遍历每一天的温度
    for (let i = 0; i < n; i++) {
        const currentTemp = temperatures[i];

        // 当栈不为空，并且当前温度比栈顶索引对应的温度高时
        while (stack.length > 0 && currentTemp > temperatures[stack[stack.length - 1]]) {
            // 弹出栈顶索引，因为它找到了它的“下一个更高温度”
            const prevIndex = stack.pop();
            // 计算天数差，并记录到结果数组中
            answer[prevIndex] = i - prevIndex;
        }
        // 将当前温度的索引压入栈中
        stack.push(i);
    }

    // 遍历结束后，栈中剩余的索引对应的温度，表示它们之后没有更高的温度，
    // 它们的answer值保持为初始的0，符合题目要求。
    return answer;
};