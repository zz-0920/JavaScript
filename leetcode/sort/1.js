const arr = [5, 3, 2, 4, 1]
//[3, 2, 4, 1, 5]
//[2, 3, 1, 4, 5]
//[2, 1, 3, 4, 5]
//[1, 2, 3, 4, 5]
// 究竟要多少次才能停下呢？ length - 1 次

// 冒泡排序
function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) { // 第 i 次冒泡
        for (let j = 0; j < arr.length - 1 - i; j++) { 
            // 比较 arr[j] 和 arr[j + 1]，根据大小交换位置
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}

console.log(bubbleSort(arr));