给定一个整数数组 nums、一个 reducer 函数 fn 和一个初始值 init，返回通过依次对数组的每个元素执行 fn 函数得到的最终结果。
通过以下操作实现这个结果：val = fn(init, nums[0])，val = fn(val, nums[1])，val = fn(val, nums[2])，... 直到处理数组中的每个元素。然后返回 val 的最终值。
如果数组的长度为 0，则函数应返回 init。

请你在不使用内置数组方法的 Array.reduce 前提下解决这个问题。
示例 1：
输入：
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr; }
init = 0
输出：10
解释：
初始值为 init=0 。
(0) + nums[0] = 1
(1) + nums[1] = 3
(3) + nums[2] = 6
(6) + nums[3] = 10
Val 最终值为 10。

示例 2：
输入： 
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr * curr; }
init = 100
输出：130
解释：
初始值为 init=100 。
(100) + nums[0]^2 = 101
(101) + nums[1]^2 = 105
(105) + nums[2]^2 = 114
(114) + nums[3]^2 = 130
Val 最终值为 130。

示例3:
输入： 
nums = []
fn = function sum(accum, curr) { return 0; }
init = 25
输出：25
解释：这是一个空数组，所以返回 init 。