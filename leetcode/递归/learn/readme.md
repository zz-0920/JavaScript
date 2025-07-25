# 递归
- 一种算法思想，一个函数在函数体中调用函数本身
 1. 把问题分解为规模更小的相同问题(找规律)
 2. 持续分解，直到问题规模足够小可以用非常简单直接的方式来解决(找终止条件)
- 递归的两个条件
 1. 可以通过递归调用来缩小问题规模，且新问题与原问题有着相同的形式
 2. 存在一种简单情境，可以使递归在简单情境下退出

# 动态规划
- 一种算法思想，通常倒着思考问题
 1. 定位到问题的终点
 2. 站在终点的视角，思考后退的可能性
- 动态规划的两个条件
 1. 最优子结构
 2. 状态转移方程

# 记忆搜索法
- 运用递归的思想，同时借助数组来保存已经计算过的结果
- 记忆搜索法是动态规划的一种特例
- 当存在两个递归同行时，一定会有重复计算的情况