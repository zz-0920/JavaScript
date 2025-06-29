var strStr = function(haystack, needle) {
    if (needle === '') return 0;
    
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        if (haystack.substr(i, needle.length) === needle) {
            return i;
        }
    }
    return -1;
};
haystack = "mississippi"
needle = "pi"
console.log(strStr(haystack, needle))