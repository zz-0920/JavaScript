var filter = function(arr, fn) {
    let filteredArr = []
    let count = 0
    for (var i = 0; i < arr.length; i++) {
            if (fn(arr[i], i)) {
            filteredArr.push(arr[i]);
        }
        }
    return filteredArr
}