var partition = function(s) {
    if (s.length === 0) {
        return [[]];
    }
    const result = [];
    for (let i = 0; i < s.length; i++) {
        let substring = s.slice(0, i + 1);
        if (isPalindrome(substring)) {
            const partitions = partition(s.slice(i + 1));
            for (let j = 0; j < partitions.length; j++) {
                result.push([substring].concat(partitions[j]));
            }
        }
    }
    return result;
};
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}