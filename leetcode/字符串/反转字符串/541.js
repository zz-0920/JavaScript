var reverseStr = function(s, k) {
    let arr = s.split('');
    for (let i = 0; i < arr.length; i += 2 * k) {
        let l = i, r = Math.min(i + k - 1, arr.length - 1);
        while (l < r) {
            [arr[l], arr[r]] = [arr[r], arr[l]];
            l++;
            r--;
        }
    }
    return arr.join('');
};