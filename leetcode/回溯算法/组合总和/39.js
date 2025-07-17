var combinationSum = function(candidates, target) {
    let res = [], path = []
    candidates.sort((a, b) => a - b)
    const backtracking = (num, index) => {
        if(num === 0) {
            res.push([...path])
            return
        }
        if(num < 0) return
        for(let i = index; i < candidates.length; i++) {
            path.push(candidates[i])
            backtracking(num - candidates[i], i)
            path.pop()
        }
    }
    backtracking(target, 0)
    return res
};