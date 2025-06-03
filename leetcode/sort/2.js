const arr = [5, 3, 2, 4, 1]
// [1, 3, 2, 4, 5]
// [1, 2, 3, 4, 5]
// 最小值

function selectSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i // 最小值的索引
        // 从 i 开始，找到最小值的索引
        const currentMin = getMin(minIndex, arr.length - 1, arr)
        // 交换最小值和当前位置的值
        if (currentMin !== minIndex) {
            // 交换最小值和当前位置的值
            [arr[i], arr[currentMin]] = [arr[currentMin], arr[i]]
        }
    }
    return arr 
}

function getMin(i, j, arr) {
    let min = Infinity
    let Index = 0
    for (let k = i; k <= j; k++) {
        if (arr[k] < min) {
            min = arr[k]
            Index = k
        }
    }
    return Index
}

console.log(selectSort(arr));