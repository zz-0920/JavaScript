var reverseStr = function(s, k) {
    let arr = s.split('');
    for(let i = 0; i < arr.length; i += 2 * k) {
        let left = i, right = ((i + k - 1) < (arr.length - 1) ? (i + k - 1) : (arr.length - 1));
        while(left <= right) {
            [arr[left], arr[right]] = [arr[right], arr[left]]
            left++;
            right++;
        }
    }
    return arr.join('')
};