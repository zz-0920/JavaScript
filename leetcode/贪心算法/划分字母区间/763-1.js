var partitionLabels = function (s) {
    let arr = [], res = [];
    for (let i = 0; i < s.length; i++) {
        let index = s.lastIndexOf(s[i]);
        if (arr.length === 0) {
            arr.push(index);
        } else {
            if (i <= arr[arr.length - 1] && index > arr[arr.length - 1]) {
                arr[arr.length - 1] = index;
            }
            if (i > arr[arr.length - 1]) {
                arr.push(index);
            }
        }
    }
    

    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            res.push(arr[i] + 1);
        } else {
            res.push(arr[i] - arr[i - 1]);
        }
    }
    return res;
};
let s = "ababcbacadefegdehijhklij"
console.log(partitionLabels(s));