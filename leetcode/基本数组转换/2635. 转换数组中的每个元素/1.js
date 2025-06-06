function map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result[i] = fn(arr[i], i);
    }
    return result;
}