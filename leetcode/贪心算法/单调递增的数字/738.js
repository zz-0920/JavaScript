var monotoneIncreasingDigits = function(n) {
    let str = n.toString();
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] < arr[i - 1]) {
            arr[i - 1]--;
            for (let j = i; j < arr.length; j++) {
                arr[j] = '9';
            }
        }
    }
    return Number(arr.join(''));
};