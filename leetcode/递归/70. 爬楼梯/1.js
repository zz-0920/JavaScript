// 达到某个目的所有解的个数
// 递归
// var climbStairs = function(n) {
//     if (n === 1) return 1;
//     else if (n === 2) return 2;
//     else return climbStairs(n-1) + climbStairs(n-2);
// };

// 记忆搜索法划 --- 优化版递归
// var climbStairs = function(n) {
//     if (n === 1) return 1;
//     else if (n === 2) return 2;
//     let dp = [1, 2];
//     for (let i = 2; i < n; i++) {
//         dp[i] = dp[i-1] + dp[i-2];
//     }
//     return dp[n - 1];
// }

// 动态规划
var climbStairs = function(n) {
    let arr = [];
    arr[1] = 1;
    arr[2] = 1;
    for (let i = 3; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n];
}