var fourSum = function (nums, target) {
    nums.sort((a, b) => a - b); // 先排序，方便去重和剪枝
    let res = [];
    let n = nums.length;
    for (let a = 0; a < n - 3; a++) { // 枚举第一个数
        if (a > 0 && nums[a] === nums[a - 1]) continue; // 跳过重复的a
        if (nums[a] + nums[a + 1] + nums[a + 2] + nums[a + 3] > target) break; // 最小四数之和大于target，后面不用再枚举
        if (nums[a] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target) continue; // 最大四数之和小于target，a太小，跳过
        for (let b = a + 1; b < n - 2; b++) { // 枚举第二个数
            if (b > a + 1 && nums[b] === nums[b - 1]) continue; // 跳过重复的b
            let c = b + 1, d = n - 1; // 双指针初始化
            while (c < d) {
                let sum = nums[a] + nums[b] + nums[c] + nums[d]; // 当前四数之和
                if (sum === target) { // 找到一组解
                    res.push([nums[a], nums[b], nums[c], nums[d]]);
                    while (c < d && nums[c] === nums[c + 1]) c++; // 跳过重复的c
                    while (c < d && nums[d] === nums[d - 1]) d--; // 跳过重复的d
                    c++;
                    d--;
                } else if (sum < target) {
                    c++; // 和太小，c右移
                } else {
                    d--; // 和太大，d左移
                }
            }
        }
    }
    return res;
};