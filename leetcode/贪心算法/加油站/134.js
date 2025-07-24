var canCompleteCircuit = function (gas, cost) {
    let totalGas = 0, totalCost = 0;
    let currentGas = 0, start = 0;
    
    for (let i = 0; i < gas.length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
        currentGas += gas[i] - cost[i];
        
        // 如果当前油量不足，重新选择起点
        if (currentGas < 0) {
            start = i + 1;
            currentGas = 0;
        }
    }
    
    // 如果总油量小于总消耗，无解
    return totalGas >= totalCost ? start : -1;
};
let gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]
console.log(canCompleteCircuit(gas, cost));