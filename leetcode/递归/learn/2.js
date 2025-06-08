// 斐波那契数列 1 1 2 3 5 8 13 21 34 55
// 递归
function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
console.log(fibonacci(10));

// 动态规划 --- 记忆搜索法
function fibonacci2(n) {
    let arr = [];
    arr[1] = 1;
    arr[2] = 1;
    for (let i = 3; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n];
}