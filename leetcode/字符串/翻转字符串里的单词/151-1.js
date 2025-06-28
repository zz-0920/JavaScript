var reverseWords = function(s) {
    let str = '', arr = []
    for(let i = 0; i < s.length; i++) {
        while(i < s.length && s[i]=== ' ') {
            if(str.length !== 0) {
                arr.push(str)
                str = ''
            }
            i++
        }
        while(i < s.length && s[i] !== ' ') {
            str += s[i]
            if(i + 1 < s.length && s[i + 1] === ' ') break
            i++
            if(i === s.length) arr.push(str)
        }
    }
    let l = 0,
    r = arr.length - 1;
    while (l < r) {
        let temp = arr[l];
        arr[l] = arr[r];
        arr[r] = temp;
        l++;
        r--;
    }
    for(let i = 0; i < arr. length; i++) {
        if(i === arr.length - 1) str += arr[i]
        else str += (arr[i] + ' ')
    }
    return result = arr.join(" ");
};
s = "the sky is blue"
reverseWords(s)